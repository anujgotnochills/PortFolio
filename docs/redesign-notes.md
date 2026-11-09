# Portfolio redesign

The supplied reference informed the warm cream paper, red frame and typography, oversized Anton headings, Caveat signature lettering, portrait cutout, and drawn accents. The gallery contains 25 videos across eight categories, including six Long Form edits, exploremanishaa, and Sarah's 21-second start time. The dot favicon matches the orange-red UI accent (#eb3327).

The responsive layout includes mobile navigation, category anchor links, portrait artwork, contact links, and reduced-motion support.

## Video playback and scrolling

Every video in the dominant visible category autoplays together, muted, including additional rows on mobile. The previous implementation only prepared one video in the next category, waited 140ms before activation, and destroyed departing players without saving positions. Other videos therefore had to load their YouTube embeds and streams after activation.

Two IntersectionObservers now track visibility and a 1000px predictive margin. The controller prepares all embeds in one upcoming category and activates the current category immediately. A passive scroll listener coalesces direction updates into a single requested animation frame, detecting reversals even when intersection thresholds do not change. Small section-overlap tolerances prevent boundary churn.

The loaded working set is limited to two categories: the active category and one paused neighbor. On handoff, the just-left category occupies the standby slot for 1.2 seconds so a quick reversal reuses its existing players, buffered data, and exact positions. After that grace period, the slot moves to the next category in the scroll direction when it is within range. Far-away categories are released. A player saves its position before eviction and restores that position, rounded down to a second in the embed start parameter, when recreated. Completed videos restart at their configured start; Sarah initially starts at 21 seconds.

Active embeds use muted inline autoplay; standby embeds have autoplay disabled. Once a standby reports PAUSED, a single seek with allowSeekAhead requests media at its resume position. The code never seeks from CUED to prime a buffer, since that would start playback. Previously played, retained players are simply paused, without seeking or recreation. Delayed playback events cannot start an inactive player.

These are cross-origin YouTube embeds, not native video elements. HTML preload, loadeddata, canplay, and waiting do not control them. The implementation uses YouTube onReady and CUED/PAUSED/BUFFERING/PLAYING events instead, observes getVideoLoadedFraction for diagnostics, and keeps the same player through buffering. It does not repeatedly reload, seek, or call play while a visible stream is waiting. YouTube controls how much media is downloaded; a seek can request data but cannot guarantee a particular buffer depth or zero startup latency. See the [YouTube IFrame API reference](https://developers.google.com/youtube/iframe_api_reference#seekTo).

Active iframes are visible before playback is requested. Each thumbnail stays until YouTube confirms PLAYING, and the player fills its media frame independently of the thumbnail. Sound controls, quality selection, fullscreen, styling, and animation are unchanged. Closing one video does not stop its siblings. Hidden tabs and page navigation release the loaded players while keeping saved positions in the mounted components.

The IFrame API script is loaded once, only when the gallery needs a player. Observers, timers, event listeners, and players are cleaned up on unmount. No per-frame scroll loop is used.

Run `npm run test:playback` for simulated viewport, immediate handoff, predictive preload, reverse-scroll retention, resume-position, paused-buffer preparation, and buffering-event checks. These tests use mocked geometry and YouTube events. No browser surface is available in this session, so actual network buffer depth and real-device startup latency have not been measured.

Anchor navigation uses native smooth scrolling and respects reduced-motion preferences. The page no longer loads the Lenis scrolling provider or its continuous animation loop.

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
