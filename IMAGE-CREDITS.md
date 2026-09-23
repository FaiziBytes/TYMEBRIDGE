# Image credits

Every photo in `client/public/img/` is **CC0 1.0 / public domain**: free for
commercial use, no attribution required, no share-alike condition. The sources
are listed anyway so provenance can be re-checked later.

Found via the [Openverse](https://openverse.org) API, filtered to CC0 only.

| File prefix | Used on | Licence | Source |
| --- | --- | --- | --- |
| `hero-roof-array` | Home hero | CC0 1.0 | https://commons.wikimedia.org/w/index.php?curid=78726150 |
| `case-flat-roof` | Home — case study | CC0 1.0 | https://www.rawpixel.com/image/3370642/free-photo-image-environmental-afternoon-alternative-energy |
| `home-solar` | Home — why us | CC0 1.0 | https://www.rawpixel.com/image/6042752/photo-image-public-domain-blue-green |
| `installers` | Home — why us | CC0 1.0 | https://commons.wikimedia.org/w/index.php?curid=83706560 |

Each prefix has WebP and JPEG variants at several widths — see
`client/src/components/site/picture.tsx`.

## These should be replaced

They are placeholders with a clear licence, not final art. Two things are wrong
with them for a real client site:

1. **None of them are ThymeBridge's own work.** A solar installer's strongest
   images are photos of jobs they actually did — they build trust and they are
   the only images that can honestly caption a case study.
2. **Three of the four are only 1024px wide**, which is the largest the source
   offered. They are fine at card size but would look soft blown up.

Every slot now carries a real photo; the coloured `ImagePlaceholder` component
is still in the tree for future pages.

The why-us section originally asked for an inverter/switchgear shot. The CC0
pool had nothing usable for that — the closest hits were utility linemen on
power poles and an old domestic fuse box — so it shows a crew fitting panels
to a roof instead, which suits "engineers, not a sales floor" better anyway.

`installers` is cropped from a wider frame. The crop is not arbitrary: the
original has another firm's advertising banner ("JT BYGG") on the scaffolding
at the right of the shot, and the crop excludes it. Keep that in mind before
re-cropping from the source.

Every candidate was checked at 100% for watermarks before shipping; one
otherwise-good rawpixel photo was rejected for a repeating watermark.

## Replacing one

Drop the new file in, run the same resize step, and keep the filename pattern
`<name>-<width>.{webp,jpg}`. If the intrinsic size changes, update the entry in
`images` in `picture.tsx` so the aspect ratio stays correct.
