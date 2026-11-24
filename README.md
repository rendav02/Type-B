# Type B: A smarter way to enter text.

Type B is a Chrome extension (Manifest V3). You prepare your text first, then Type B enters it into websites gradually:

- **Auto Type** types it for you at a speed you choose (WPM), with natural timing.
- **Keyboard Assist** inserts the next character, word or chunk each time you press a trigger key.

Everything runs locally. There is no backend, no account and no network access.

**Status: complete (v1.0.0).** All eight development phases are done:

1. Foundation
2. Typing interface
3. Typing engine
4. Keyboard Assist
5. Website integration and right-click menu
6. Floating controller
7. Gmail, Messenger and Google Docs
8. Snippets, settings, tests and docs

---

## 1. What you need

| Tool | Version | Download |
|---|---|---|
| Node.js | 18 or newer (20 / 22 LTS recommended) | https://nodejs.org |
| Visual Studio Code | any recent version | https://code.visualstudio.com |
| Google Chrome | 110 or newer | https://www.google.com/chrome |

To check Node.js, open a terminal and run `node -v`.

## 2. Open and build the project in VS Code

1. **Unzip** `type-b.zip`, for example to `Documents/type-b`.
2. Open **VS Code** → **File → Open Folder…** → select the `type-b` folder.
3. If VS Code asks *"Do you trust the authors?"*, click **Yes**. The recommended extensions (Tailwind CSS IntelliSense, Vitest) are optional.
4. Open the terminal: **Terminal → New Terminal** (or <kbd>Ctrl</kbd>+<kbd>`</kbd>).
5. Install dependencies (only needed once):
   ```bash
   npm install
   ```
6. Build:
   ```bash
   npm run build
   ```
   This type-checks the code and creates **two** extension folders:

   | Folder | Use it if… |
   |---|---|
   | **`dist`** | You don't need Google Docs. Fewest permissions. |
   | **`dist-docs`** | You want to type into **Google Docs**. Same extension, plus Chrome's `debugger` permission. |

   The ZIP already contains both folders ready-made, so you can skip this step the first time.

## 3. Load it in Chrome

1. Go to **`chrome://extensions`**.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select **`dist`** or **`dist-docs`**. Don't select the project folder itself. Load **only one** of them; if you switch, remove the other first.
4. Click the puzzle-piece icon in the toolbar and **pin** Type B.

**After changing code:** run `npm run build`, click **↻ reload** on the Type B card in `chrome://extensions`, then refresh the web pages you're testing on.

## 4. How to use it

### Start a session from the right-click menu
1. Click into a text field on a website (Gmail, Messenger, a contact form…).
2. Right-click → **Type B** → **Start Auto Type** or **Keyboard Assist**. (**Open Type B** opens the editor.)
3. A **Ready to type** card appears showing the target field, a text preview and the speed. Nothing is typed yet.
4. Click **Start**.
   - Auto Type begins after a short countdown (3 seconds by default, configurable).
   - Keyboard Assist waits for your trigger key (default **F2**).

### Start from the toolbar popup
Click into the field, open the popup, write or paste your text, choose a mode and click **Start**. The confirmation card then appears on the page.

### The floating window: compact, expanded, hidden
Open it with the popup's **Open on this page** button or <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

| Mode | What you see | How to get there |
|---|---|---|
| **Compact** | Small bar. During a session it shows status, %, pause and stop | **–** Minimize, or automatically after inactivity |
| **Expanded** | The full editor, the confirmation card, or the live controller | Click the compact bar or start typing on it, **⤢** Expand |
| **Hidden** | Only a tab on the right edge (with a progress dot during a session) | **eye-off** Hide, or <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |

- **Restore:** click the edge tab or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>. It returns to the last mode you used.
- **Moving the window:** drag it by the header (expanded) or the grip (compact). The position is remembered.
- **Animations:** mode changes animate smoothly.
- **Idle auto-minimize:** after 30 seconds of inactivity, the expanded window shrinks to compact. This never happens while it's waiting for your confirmation. Change or disable it in Settings.
- **Focus:** clicking the window's buttons never takes keyboard focus away from your text field.

### Live controller (during a session)
The controller shows:
- status, progress %, characters entered and remaining
- current speed and time left
- for Keyboard Assist, a preview of the **next insert**, with spaces shown as `·` and line breaks as `↵`

| Action | Button | Shortcut |
|---|---|---|
| Pause / Resume | ⏸ / ▶ | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Stop | ■ | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> |

Type B also **pauses automatically** in these cases, so text never goes to the wrong place:
- the text field loses focus
- you switch tabs
- the field disappears from the page

Click back into the field and press **Resume** to continue. When a session ends, a summary appears. If anything is left untyped, **Copy remaining** puts it on the clipboard.

### Speed presets and per-site memory
- The editor and the **Ready to type** card have **Slow (35) / Normal (60) / Fast (100)** presets. On the card you can also fine-tune the speed with **−/+** and switch mode before starting.
- The speed you set in the editor is the one used for the session.
- With **Settings → Per-site memory** on (default), Type B remembers the mode and speed you last used on each website. Next time, the card starts at that speed and shows *"Last used on this site"*, with **Use it** if the mode differs. You can review or **Forget** sites in Settings.

### Templates with fields
Write `{{field}}` anywhere in your text, for example:

```
Hi {{name}}, thanks for your order {{order}}. — {{date}}
```

- Before typing, Type B asks you to fill in each field.
- `date`, `time`, `day` and `year` fill in automatically. Other values are remembered for next time.
- Templates work from the editor, snippets, the popup and the right-click menu.
- The editor shows a hint when your text contains fields. Single braces like `{name}` are left alone, so normal text and code aren't affected.

### Text cleanup
**Clean up** (or **Clean** in the floating window) fixes common problems in pasted text:

| Option | What it fixes |
|---|---|
| Straight quotes | Curly quotes become straight quotes |
| Single spaces | Double spaces inside lines become one |
| Trim line ends | Removes spaces at the ends of lines |
| Limit blank lines | At most one empty line in a row |
| Remove invisible characters | Removes zero-width characters; non-breaking spaces become normal spaces |
| Trim start and end | Removes spaces before and after the text |
| Plain dashes | Em and en dashes become `-` (off by default) |

Your choices are remembered. **Undo cleanup** restores the original text.

### Resume later
If you **stop** a session, it ends with an error, or you close Type B mid-session, the untyped rest is saved on this device. The editor then shows **Unfinished text** with **Continue**, which loads the remaining text with the same mode and speed, or **×** to discard it. Click where the text should continue, then start again.

### Keyboard Assist details
Choose the **trigger** in the editor (Keyboard Assist → Trigger) or in **Settings → Keyboard Assist**:

| Trigger | What happens |
|---|---|
| **One key** (default <kbd>F2</kbd>) | Only that key inserts text; every other key types normally |
| **Any key** | Every letter, number, space and punctuation key inserts the next piece |

In **Any key** mode:
- **Backspace** undoes the last piece. You can turn this off in Settings.
- **Enter, Tab, arrow keys, Esc** and shortcuts like **Ctrl/Cmd+C / V / Z** are never captured and work normally.
- To type your own text, **pause** (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or the Pause button), type, then resume.

In both modes:
- Each trigger press inserts one **character**, **word** (with its trailing space), **sentence** (up to `. ! ?`), **line**, or **chunk** of N characters.
- **Undo** (default <kbd>F4</kbd>) removes the last inserted piece. It only does this if that text is still right before the cursor; if you've typed or moved since, it refuses, so your own text is never deleted. In Google Docs the text can't be checked, so undo simply presses Backspace for the piece's length.
- **Skip** (default <kbd>F9</kbd>) jumps over the next piece without typing it. Undo also reverses a skip.
- Undo and Skip are also buttons in the controller.
- The trigger key is intercepted before the page sees it, so its own character is never typed and site shortcuts aren't triggered.
- Holding the key down doesn't repeat. Presses made faster than text can be inserted are queued, never duplicated.
- While paused, all keys work normally.
- In One key mode, you can still type your own characters in between.

### Saved snippets
- **Save snippet** (or **Save** in the floating window) stores the current text with a title and optional folder.
- **Saved Snippets** lets you search, filter by folder, edit, delete and **Use** them.
- In the editor, **Snippets** opens a quick picker.

### Settings
| Section | What you can set |
|---|---|
| Appearance | Theme: System, Light or Dark |
| Typing preferences | Default mode, default WPM, variable speed, minimum and maximum delay, word pause, sentence pause, start countdown, plus a **live typing preview** that uses the real engine timing |
| Keyboard Assist | Trigger (one key or any key), trigger/undo/skip keys, Backspace undo, and unit (character, word, sentence, line or chunk) |
| Per-site memory | On/off, plus the list of remembered sites with **Forget** |
| Floating window | Opening mode and the idle auto-minimize delay |
| Website compatibility | What works where, and whether this build includes Google Docs typing |
| Keyboard shortcuts | Shows the current shortcuts, with a link to Chrome's shortcut page |
| Privacy | What Type B stores and never does |
| Reset | Restores default settings (snippets are kept) |

## 5. Website compatibility

| Where | Status | How |
|---|---|---|
| Text inputs and text areas | ✅ | `execCommand('insertText')` (trusted input events, undo works, React/Vue-controlled fields update), with a direct-edit fallback |
| Rich-text / contenteditable editors | ✅ | Same, with line breaks inserted as the editor expects |
| Gmail composer | ✅ | contenteditable profile |
| Messenger (messenger.com, facebook.com/messages) | ✅ | Line breaks are inserted as soft breaks (like Shift+Enter), so multi-line text **doesn't send early** |
| Google Docs | ✅ Docs edition | See below |
| Password fields | ❌ by design | Type B refuses to type into them |
| Number, date and color inputs | ❌ | Not text fields |
| `chrome://` pages, Web Store, PDF viewer | ❌ | Chrome blocks all extensions there. Type B shows a message |
| Single-line inputs | ⚠️ | Line breaks become spaces, because Enter would submit the form |

If a site rejects scripted input, Type B stops with an explanation and offers **Copy text / Copy remaining** so you can paste instead.

**Google Docs.** Docs draws the document on a canvas and ignores script-generated DOM events, so normal insertion can't work there. Type B uses Chrome's official **debugger API** (`Input.insertText`), which produces trusted keyboard input.

Chrome only allows the `debugger` permission at install time; it can't be requested later as an optional permission. So Docs support ships as the separate **Docs edition**, the **`dist-docs`** folder, listed in Chrome as "Type B (Docs edition)":
- **To switch:** go to `chrome://extensions`, **Remove** Type B, then **Load unpacked** → `dist-docs`. Your settings and snippets are stored per extension, so re-save any snippets you need.
- Chrome's install prompt for this edition mentions debugger access. **Settings → Website compatibility** shows "Enabled (Docs edition)".
- With the standard `dist` build, Type B detects Docs, explains that it needs the Docs edition, and offers **Copy text** instead.
- While a Docs session runs, Chrome shows a *"Type B started debugging this browser"* banner. Pressing **Cancel** on it pauses the session.
- The debugger is attached only to the Docs tab, only while typing, and is released when the session ends.
- Docs replaces Chrome's right-click menu, so start sessions from the toolbar popup or <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

Gmail, Messenger and Google Docs need a signed-in account, so the automated tests use local stand-ins. The Docs test page receives real debugger input, but the live sites themselves weren't tested and they change their editors over time. If one stops working, Type B reports the error instead of failing silently.

## 6. Commands

| Command | What it does |
|---|---|
| `npm run build` | Type-check + production build into `dist/` |
| `npm test` | Unit tests (Vitest): engine, keyboard, compatibility, storage, settings, floating modes |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run typecheck` | TypeScript only |
| `npm run dev` | UI preview at http://localhost:5173/dashboard.html (uses localStorage; extension-only features need the built extension) |
| `npm run test:e2e` | **Optional.** Browser tests with the real extension (Docs edition). First run `npm install --no-save playwright` and `npx playwright install chromium`, then `npm run build` |
| `npm run zip` | Build and zip both editions as `type-b-extension.zip` and `type-b-docs-extension.zip` (macOS/Linux; on Windows, zip the folders from Explorer) |

## 7. Project structure

```
type-b/
├─ public/manifest.json         Manifest V3
├─ popup.html, dashboard.html
├─ scripts/make-docs-build.mjs  Creates dist-docs (adds the debugger permission)
├─ src/
│  ├─ engine/                   Typing engine (no DOM/UI): timing, chunking, TypingSession state machine
│  ├─ keyboard/                 Trigger-key interception (KeyboardManager) + pure key helpers
│  ├─ compat/                   Website compatibility
│  │  ├─ editable.ts            Find & classify the target field (refuses passwords)
│  │  ├─ domInserters.ts        Inputs, textareas, contenteditable
│  │  ├─ sites.ts               Gmail / Messenger / Docs profiles (by URL only)
│  │  └─ googleDocs.ts          Docs module (debugger-based)
│  ├─ content/                  Content script
│  │  ├─ index.tsx              Shadow DOM mount + message routing
│  │  ├─ runner.ts              SessionRunner: target → confirm → countdown → engine → history
│  │  ├─ FloatingApp.tsx        Floating window (compact / expanded / hidden)
│  │  └─ views/SessionViews.tsx Confirm, controller, summary, pick-a-field, unsupported cards
│  ├─ background/               Service worker: context menu, injection, commands, debugger
│  ├─ components/               AppShell, Sidebar, Workspace, TypingPreview, ui/*
│  ├─ pages/                    Snippets, Recent Sessions, Settings
│  ├─ hooks/  storage/  lib/  shared/  styles/
│  └─ popup/ dashboard/         React entry points
├─ tests/                       Vitest unit tests
├─ e2e/                         Optional Playwright end-to-end suite + fixture page
├─ vite.config.ts               Build 1: pages + service worker
└─ vite.content.config.ts       Build 2: content script as one IIFE file
```

**How the pieces talk:** the popup, right-click menu and shortcuts send messages to the **background worker**. The worker injects the **content script** into the active tab (only on your action) and forwards commands to it. The content script's **SessionRunner** picks the target field and builds an **Inserter** from `compat/`. After you confirm, it runs the **TypingSession** engine, which calls the inserter for each piece. For Google Docs, the inserter asks the background worker to deliver input through `chrome.debugger`.

## 8. Privacy and permissions

| Permission | Why |
|---|---|
| `storage` | Settings, snippets, draft and session history, **stored locally** |
| `activeTab` | Access to the current tab, granted only when you click the icon, use a shortcut or use the right-click menu |
| `scripting` | Injects Type B into that tab |
| `contextMenus` | The right-click **Type B** menu on text fields |
| `debugger` (**Docs edition only**) | Google Docs typing. Attached to the Docs tab only while a session types |

- No host permissions. Type B doesn't run on any site until you invoke it there.
- No network requests or analytics. Your text never leaves your device. Type B doesn't read browsing history, never types into or reads password fields, and decides site behaviour from the URL only.
- Session history keeps only the site name, character counts and time, never the text.
- **Unfinished text** (Resume later), your draft, snippets and template values are stored locally only. Discard unfinished text with **×** in the editor.
- Typing never starts without your explicit **Start**. The UI labels all input as automated. Type B is **not** a tool for passing off automated text as human-typed.

## Troubleshooting

- **`npm` is not recognized:** install Node.js, then restart VS Code.
- **"Manifest file is missing or unreadable":** select the `dist` folder, not the project folder.
- **Right-click menu has no "Type B":** right-click *inside* a text field. Google Docs uses its own menu, so use the popup instead.
- **Nothing happens / "can't run on this page":** use a normal `http(s)` site. Reload the page after reloading the extension.
- **Typing paused by itself:** the field lost focus or you switched tabs. Click back into the field and press Resume.
- **Shortcuts show "Not set":** another app or extension already uses them. Assign your own at `chrome://extensions/shortcuts`.
- **"Only permissions specified in the manifest may be requested":** you have an old build. Remove it and load `dist` or `dist-docs` from this version.
- **Google Docs says it needs the Docs edition:** remove Type B in `chrome://extensions` and load the `dist-docs` folder.
- **"Another debugger is already attached":** close DevTools on that tab.
