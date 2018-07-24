import { store } from 'react-easy-state';

const settingsStore = store({
  global: {
    siteName: 'My Website',
    tagline: 'Awesome Tagline',
    disableBlogMenu: false,
    disableNewRegistrations: false,
    squareLogoURL: '',
    horizontalLogoURL: '',
  },
  landingPage: {},
  footer: {
    showNavigation: true,
    phoneNumber: '+XX XXX XXX XXXX',
    aboutUs: 'You can change this description in settings/footer',
    address: '311 Mountainview CA',
    email: 'email@domain.com',
    facebookURL: 'http://fb.me',
    twitterURL: 'http://twitter.com',
    showWidgets: true,
  },
});

export default settingsStore;
