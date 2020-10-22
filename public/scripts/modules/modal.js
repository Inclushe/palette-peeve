export default {
  state: {
//     code: `$gray100: #EEF0F6;
// $gray200: #DCDFEA;
// $gray300: #C8CDDA;
// $gray400: #B7BDCC;
// $gray500: #A7ABBE;
// $gray600: #8A90A8;
// $gray700: #686E84;
// $gray800: #52576B;
// $gray900: #454854;
// $blue100: #edf4ff;
// $blue200: #d0dafa;
// $blue300: #95abf4;
// $blue400: #5d7de8;
// $blue500: #4669db;
// $blue600: #2255bb;
// $blue700: #1c4599;
// $blue800: #133a70;
// $blue900: #132c54;`,
    code: '',
    title: 'Welcome to Palette Peeve.',
    description: `This application is a work in progress.<br>Drag or click on a shade's color inputs to change them.`,
    hasSecondaryButton: false,
    hidden: false
  },
  mutations: {
    showModal (state) {
      state.hidden = false
    },
    hideModal (state) {
      state.hidden = true
    },
    setModalTitle (state, title) {
      state.title = title
    },
    setModalHasSecondaryButton (state, bool) {
      state.hasSecondaryButton = bool
    },
    setModalDescription (state, description) {
      state.description = description
    },
    setModalCode (state, code) {
      state.code = code
    },
  }
}