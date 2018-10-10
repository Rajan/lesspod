import { store } from 'react-easy-state';

const settingsStore = store({
  global: {
    siteName: 'My Website',
    tagline: 'Awesome Tagline',
    disableBlogMenu: false,
    disableNewRegistrations: false,
    squareLogoURL: '',
    horizontalLogoURL: '',
	trackerID: '',
  },
  landingPage: {
    headline: 'Headline',
    description: 'A description line to help visitors know more',
    subtitle: 'Subtitle',
    subtitlePoints: 'Enter small sentences to highlight your product/service',
    summary: 'This is a serverless website hosted freely on Firebase.',
    showLatestPosts: false,
    featuredImageURL: '',
    featuredImageCaption: 'A caption for featured Image',
  },
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
