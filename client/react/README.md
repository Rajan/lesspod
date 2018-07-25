# Client

> Lesspod React Client

## Config

Create 'firebase.js' in ./src/config/ with your project config from console.firebase.com

firebase.js
```bash
export const config = {
  apiKey: 'YOUR_FIREBASE_PROJECT_API_KEY',
  authDomain: 'YOUR_FIREBASE_PROJECT.firebaseapp.com',
  databaseURL: 'YOUR_FIREBASE_PROJECT.firebaseio.com',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: 'YOUR_FIREBASE_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_FIREBASE_PROJECT_MSG_SEN_ID',
};
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build

# run all tests
npm test
```
Note: The react client is in a very early development. Do not raise issues around the react client.