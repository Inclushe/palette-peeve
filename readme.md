# UI Palette Picker

`Note to self: Mockup incremential improvements`

- `E` Essential
- `D` Desirable
- `O` Optional

## Project Log

- [ ] UI `E`
  - [X] Design
    - [X] Undo/Redo Buttons
    - [X] Selecting
    - [X] Copy/Paste Buttons
    - [X] Hide/Show Buttons
    - [X] Contrast Checker
  - [ ] Code
    - [X] Palette Name/Types
    - [X] Input Hover/Active/Selected States
      - Make 100-500 light and 600-900 dark
    - [X] Adjust Palette type height
    - [X] Buttons
    - [X] Selecting Outline
      - [X] Hide when changing color
      - [X] Deselect when clicking outside of palette
      - [X] Disable copy/paste/hide buttons when not selected
    - [X] Contrast Warning
- [ ] Add tooltips `E`
  - [X] Mockup
  - [ ] Code
- [ ] Add indicator ripple `O`
  - [X] Mockup
  - [ ] when button is hovered/pressed
  - [ ] when keyboard shortcut is used
- [ ] Fix Undo/Redo `E`
  - [ ] Save all actions
  - [ ] Save only diffs
  - [ ] Turn into queue
- [ ] Fix Drag
- [ ] Export support `E`
  - [ ] Mockup
  - [ ] Code
    - [ ] Figma `E`
    - [ ] CSS `D`
      - [ ] Varibles `D`
      - [ ] SCSS `O`
      - [ ] SASS `O`
      - [ ] Tailwind `O`
    - [ ] Illustrator `O`
- [ ] Delete/Reset

---
At this point, perform UX tests

- [ ] Settings `D`
  - [ ] Color Contrast
    - Black on 500
    - White on 500
    - Auto
    - Turn off contrast warnings (auto)
    - Show indicator for AA or AAA
- [ ] Multipallete `D`
- [ ] Allow variable # of palettes `O`
- [ ] Save/Load `E`
- [ ] Allow UI preview to be swapped out `O`
- [ ] Tutorial `D`
  - [Ask users to read this or use own text](https://refactoringui.com/previews/building-your-color-palette/)
  - Base color
    - Text Color Black/White/Ignore Contrast
  - 100/900
  - 300/700 (I don't know how to fix the UI to appropriately adjust this)
  - 200/400
  - 600/800
- [ ] Welcome page `E` or Welcome screen `O`
- [ ] Credits `E`
