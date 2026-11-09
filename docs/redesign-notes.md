# Portfolio redesign

The supplied reference informed the warm cream paper, red frame and typography, oversized Anton headings, Caveat signature lettering, portrait cutout, and drawn accents. The gallery retains all 23 videos across eight categories, including exploremanishaa and Sarah's 21-second start time. The dot favicon matches the orange-red UI accent (#eb3327).

The responsive layout includes mobile navigation, category anchor links, portrait artwork, contact links, and reduced-motion support.

The larger toolkit strip displays local logos for Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Blender, and Cinema 4D. Adobe icons were optimized from the existing project images; the other three SVGs came from the [Simple Icons repository](https://github.com/simple-icons/simple-icons/tree/develop/icons). Icons are 64px on desktop and 52px on mobile.

## Hero portrait

- Saved asset: `public/portrait-suit-cutout.png`
- Source photograph: user-provided `Young Man in a Classic Black Suit.png`
- Method: built-in ImageGen background removal, followed by trimming and export for the website.
- Final prompt:

> Remove only the white background from the attached portrait of the young man in a classic black suit. Preserve the exact man's face, identity, hair, smile, head tilt, body, suit, white shirt, hands in pockets, and pose without alteration. Keep the original natural skin and clothing colors. Produce a clean true transparent alpha background, including spaces beside the arms; preserve fine hair edges. Do not redraw, beautify, restyle, alter facial features, add anything, or invent anatomy. Keep the existing lower-body crop. Center the isolated man on the transparent canvas. No shadow, halo, text, backdrop, or decorative graphics. This cutout will be used as a large portrait on a cream portfolio hero.

The hero portrait has a wider center column and uses contain sizing to display the entire cutout without cropping. On desktop it spans the greeting and bottom-label rows, using the full marked center area down to the footer rule. MEET and ANUJ sit on either side, and the description has moved to the right. The mirror selfie has moved to the About section.

The doodles share the portrait's 828 × 1200 coordinate system and bottom-centered contain sizing. Shoulder and sleeve contours sit outside the alpha silhouette; the heart, stars, arrow, and caption occupy transparent space around the head. Responsive side gutters keep the strokes and caption inside the portrait area.

On mobile, the portrait container takes its height from the photo's aspect ratio and can shrink for short screens. The greeting, portrait, and MEET ANUJ labels pack together instead of stretching the photo area and leaving empty space above the head.

## About portrait

- Saved asset: `public/portrait-selfie-cutout.png`
- Source photograph: user-provided `Smart-Casual Hallway Mirror Selfie.png`
- Method: built-in ImageGen edit with transparent background; the result was trimmed and exported for the website.
- Final prompt:

> Remove the background from the supplied mirror selfie with high precision. Keep only the exact same man, his hair, face, black suit, white shirt, trousers, hands, phone, and wrist thread from the photo. Preserve his identity, facial features, expression, gaze, body proportions, pose, clothing and phone exactly; do not redraw, beautify, restyle, or change him. Remove the hallway, elevator, walls, floor, ceiling, mirror environment, and all surrounding background. Background must be genuinely transparent, including the negative spaces between his arm and torso. Preserve the existing crop at the lower legs, do not invent additional anatomy. Clean natural anti-aliased edges, especially around the hair and suit. Center the isolated person on the transparent canvas, using the original image proportions. No added text, border, shadow, graphics, halo, or background.

The hero keeps the portrait centered, with the former decorative circular backdrop removed. On desktop, the greeting and intro flank the image; on mobile, they stack. The header and hero share a viewport-height budget, with flexible space for the image and a reserved bottom row for MEET ANUJ so the full introduction fits on the first screen.

## Verification scope

The local page returns HTTP 200. TypeScript, production build, and generated HTML checks verify implementation and content. Visual browser QA remains unverified because this session has no browser surface available.
