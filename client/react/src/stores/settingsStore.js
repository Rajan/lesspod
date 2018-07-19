import { store } from 'react-easy-state';

const settingsStore = store({
  global: {
    tagline: '',
    disableBlogMenu: false,
    disableNewRegistrations: false,
    squareLogoURL: '',
    horizontalLogoURL: '',
  },
});

export default settingsStore;
