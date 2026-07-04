# TutorTrack

A fast, mobile-first web app for tuition teachers to fill in a student's weekly report and share it straight to WhatsApp as an image — no sign-in, no database, no setup per student.

Built for a single teacher's real weekly workflow: pick a student, mark attendance and homework for the week, record the Saturday test score, jot feedback, generate a clean report card, and share it in one tap.

## Why it exists

Manually typing out a WhatsApp message for every student, every week, is slow and error-prone. TutorTrack turns that into a 30-second, mostly-tap workflow and produces a shareable image instead of a wall of text.

## Features

- **Student picker** — searchable combobox over a saved roster, with free-text fallback for students not yet in the list
- **Attendance & homework** — Mon–Sat toggles, defaulting to Present + HW Done so the teacher only touches the exceptions
- **Smart homework field** — marking a day Absent automatically shows "–" for homework instead of a toggle
- **Saturday test score** — two linked dropdowns (max marks → score obtained), no free typing; automatically disabled if the student was absent that Saturday
- **Feedback** — tap-to-add preset comments (Good / Average / Needs Improvement), which stack as bullet points, plus free-form text
- **Report card generation** — renders a styled, paper-like report card as the actual shareable output (not just text)
- **One-tap WhatsApp share** — captures the report as a PNG and opens the native share sheet via the Web Share API, with a "long-press to save" fallback on unsupported browsers
- **Fully stateless** — nothing is saved between sessions; the app is just a fast generator, not a records system

## Tech stack

| Purpose | Library |
|---|---|
| Framework / bundler | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI (Select, Switch, Popover, Slot), styled shadcn-style |
| Report → image | html-to-image |
| Dates | date-fns |
| Icons | lucide-react |
| Sharing | Web Share API (`navigator.share`) |

No backend, no database, no `localStorage` — everything lives in memory for the current session, by design.

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
# production build
npm run build

# preview the production build locally
npm run preview
```

## Using the app

1. Type or pick the student's name — class auto-fills for roster students.
2. Flip attendance/homework toggles only for exception days; everything defaults to Present + HW Done.
3. Pick max marks, then score obtained for Saturday's test (skipped automatically if Saturday was marked absent).
4. Tap preset feedback chips and/or type your own notes.
5. Tap **Generate Report** to render the report card.
6. Tap **Share on WhatsApp** to open the native share sheet with the image attached, and pick the contact or group.
7. Edit the form directly for the next student — there's no save step or auto-reset.

> **Note on sharing:** `navigator.share()` with file attachments requires a supporting browser and, in most cases, HTTPS (or `localhost`). On desktop browsers without support, the app falls back to showing the image so it can be long-pressed and saved manually.

## Project structure

```
/src
  /components
    StudentSearch.jsx      – roster combobox with free-text fallback
    DayRow.jsx              – one Mon–Sat attendance/homework row
    TestScorePicker.jsx     – linked max-marks + score dropdowns
    CommentPresets.jsx      – tap-to-add feedback chips
    ReportPreview.jsx       – the visual report card (image capture target)
    ShareButton.jsx         – image generation + WhatsApp share
    /ui                     – shadcn-style primitives (button, input, select, switch, card, etc.)
  /data
    roster.js               – hardcoded student list
    presets.js              – feedback preset phrases
  /utils
    dateHelpers.js          – week/date calculations
    imageExport.js          – html-to-image capture + share-capability check
  /lib
    utils.js                – `cn()` class-merging helper
  App.jsx
  main.jsx
  index.css                 – Tailwind theme tokens + design tokens
```

## Customizing

- **Roster** — edit the array in `src/data/roster.js`.
- **Feedback presets** — edit `src/data/presets.js`.
- **Palette / theme** — all design tokens (`--color-*`, fonts) live in the `@theme` block at the top of `src/index.css`.
- **Teacher signature** on the report card — set in `src/components/ReportPreview.jsx`.

## Performance notes

- Fonts are loaded via a `<link rel="stylesheet">` (not a CSS `@import`) with `preconnect` hints, so they're discovered and fetched immediately instead of after the app's CSS loads.
- `DayRow` is memoized with a stable `(index, patch)` update handler, so editing unrelated fields (like the feedback textarea) doesn't re-render the attendance rows.
- No unused dependencies — everything in `package.json` is actually imported somewhere in `src`.
- Report images are captured at 2x pixel ratio for crisp WhatsApp previews without over-inflating file size.

## License

Private project — not published or licensed for reuse.
