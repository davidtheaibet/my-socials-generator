# my-socials-generator

Mobile-first social message generator scaffold with a reusable template engine and implemented WhatsApp + Instagram DM lanes.

## Implemented in this task

- Lane switcher for `WhatsApp` and `Instagram DM`
- Shared editable fields: `name`, `profile image URL`, `message`, `timestamp`, `status`
- Responsive editor + live preview layout (stacked on mobile, split on desktop)
- Modular template architecture for future platform lanes (`src/templates`)
- Baseline unit tests for core state/formatting logic

## Project structure

- `index.html`: app shell and editor inputs
- `styles.css`: mobile-first layout and WhatsApp visual styling
- `src/main.js`: app wiring and real-time updates
- `src/state.js`: shared editor state utilities
- `src/templates/templateEngine.js`: reusable chat-template renderer
- `src/templates/whatsapp.js`: WhatsApp template config
- `src/templates/instagramDm.js`: Instagram DM template config
- `test/state.test.mjs`: Node tests for state helpers

## Run locally

```bash
# run tests
npm test

# serve the app (any static server)
npx serve .
```

Then open the printed local URL in your browser.
