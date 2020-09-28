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
- [X] Add tooltips `E`
  - [X] Mockup
  - [X] Code
- [X] Add indicator ripple `O`
  - [X] Mockup
  - [X] when button is hovered/pressed
  - [X] when keyboard shortcut is used
- [X] Move tooltips to component
- [X] Move ripple to component
- [X] Move buttons to component
- [X] Fix Undo/Redo `E`
  - [X] Save all actions
- [X] Fix Drag
- [ ] Export support `E`
  - [X] Mockup
  - [ ] Code
    - [X] Figma `E`
    - [ ] CSS `D`
      - [ ] Varibles `D`
      - [ ] SCSS `O`
      - [ ] SASS `O`
      - [ ] Tailwind `O`
    - [ ] Illustrator `O`
- [ ] Delete/Reset

---
At this point, perform UX tests

- [ ] Add different input types
- [ ] Issues
  - [ ] Hidden has tooltip
  - [ ] Make hidden icon more apparent
  - [ ] Not apparent you can copy and paste
  - [ ] Weird NaN issue?
  - [ ] Add warnings when editing input on
    - [ ] hidden shade
    - [ ] close to black/white shade
    - [ ] low saturation
  - [ ] Suggest choosing inbetween values
  - [ ] Onboarding
- [ ] Logo Design `E`
- [ ] Settings `D`
  - [ ] Color Contrast
    - Black on 500
    - White on 500
    - Auto
    - Turn off contrast warnings (auto)
    - Show indicator for AA or AAA
- [ ] Multiselect `O`
- [ ] Multipallete `D`
- [ ] Allow variable # of palettes `O`
- [ ] Save/Load `E`
- [ ] Make responsive
  - [ ] Get it working on phones `O`
- [ ] Allow UI preview to be swapped out `O`
- [ ] Tutorial `D`
  - [Ask users to read this or use own text](https://refactoringui.com/previews/building-your-color-palette/)
  - Base color
    - Text Color Black/White/Ignore Contrast
  - 100/900
  - 300/700
  - 200/400
  - 600/800
- [ ] Select different UI types `O`
- [ ] Welcome page `E` or Welcome screen `O`
- [ ] Credits `E`
