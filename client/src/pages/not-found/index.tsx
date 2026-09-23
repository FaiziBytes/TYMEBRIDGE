import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-6">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground text-sm">This page does not exist.</p>
      <Link to={paths.home} className="text-primary text-sm underline">
        Go home
      </Link>
    </main>
  );
}
