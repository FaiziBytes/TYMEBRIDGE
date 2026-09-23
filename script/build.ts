import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, cp } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const allowlist = [
  "cors",
  "express",
  "express-rate-limit",
  "jsonwebtoken",
  "multer",
  "nodemailer",
  "pg",
  "zod",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  execSync("npx prisma generate", { stdio: "inherit" });

  await viteBuild();

  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  const viteRelatedPackages = ["vite", "@vitejs/plugin-react"];

  viteRelatedPackages.forEach((pkg) => {
    if (!externals.includes(pkg)) {
      externals.push(pkg);
    }
  });

  const serverDir = path.resolve(process.cwd(), "server");
  const externalVitePlugin = {
    name: "external-vite-files",
    setup(build: import("esbuild").PluginBuild) {
      build.onResolve({ filter: /^\.\/vite$/ }, (args) => {
        if (args.importer.startsWith(serverDir)) {
          return { external: true };
        }
      });
      build.onResolve({ filter: /vite\.config/ }, () => {
        return { external: true };
      });
    },
  };

  await esbuild({
    entryPoints: ["server/server.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
    plugins: [externalVitePlugin],
  });

  await esbuild({
    entryPoints: ["server/serverless.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/serverless.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
    plugins: [externalVitePlugin],
  });

  // ship static server assets (inline email logo, …) alongside the bundle
  // git does not track empty folders, so server/assets may be absent on a fresh clone (e.g. Vercel)
  if (existsSync("server/assets")) {
    await cp("server/assets", "dist/assets", { recursive: true });
  }
}

buildAll().catch((err) => {
  // print the failure — swallowing it exits 1 with no diagnostics, which makes
  // a CI or Vercel bundling error impossible to diagnose from the logs
  console.error(err);
  process.exit(1);
});
