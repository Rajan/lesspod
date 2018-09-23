![Lesspod Logotype](https://github.com/Tobaloidee/lesspod/blob/master/images/readme-logo.png)

Serverless CMS (Website + Blog Engine) (In Active Development)


## Why Lesspod?

In 2015, carbon emissions from data centers exceeded the carbon emissions from air travel. There are 16 million websites being added to the Internet every month. Most websites require servers to host and most of the servers are underutilized. There are a lot of unused server resources costing us carbon emissions and money. We can reverse this damage by going serverless. 

Lesspod's mission is to transition the Internet from server architecture to serverless architecture as soon as possible. To that end, we're building it as an open source project that anyone can utilize.

Our goal is to make it as simple as possible to host serverless websites and blogs. As we build Lesspod, we stare at the possibility of the serverless Internet.

Demo serverless website: https://lesspod.org

## Free Forever Web Hosting (Cloud Limits Apply)

Lesspod helps to host free websites and blogs for people who don't want to pay for recurring hosting fees within free limits offered by cloud providers like Google Firebase and AWS Lambda (costs something). Lesspod is dynamic and offers a better alternative to static sites which can be difficult to install and manage.

## Choice of building blocks

We want to keep Lesspod as simple as possible for everyone to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (using sequelize ORM LOCAL ONLY for development purpose)
- Express 4 (Most popular node.js framework)
- ~~EJS~~ VueJS (Clean, Fast and Easiest to Learn)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- ~~Parcel.js~~ Webpack 3/4 as a bundler
- js-cookie npm module (In future: Store for local storage: https://www.npmjs.com/package/store)

Note: The local api gets discarded on deploying to Firebase. So, It's vuejs talking directly to Firebase.


## Contributing To Lesspod

Key software versions. Node: 10.0.0 and NPM: 6.0.0

#### Running the API component (Local): http://localhost:1234/

At this point we're directly talking to firebase and not making progress on the local API component. Eventually, we'll support AWS Lambda, Azure Cloud Functions etc. and add support for building locally and deploying on a set of faas/serverless platforms.

Skip following steps for now:

```
$ git clone https://github.com/Rajan/lesspod.git   //clone repo
$ cd lesspod  //move to project directory
$ npm install //install necessary packages 
$ node -r dotenv/config index.js //setup environment variables
```
Note: some npm modules may need to be installed manually.

<!-- parcel index.js // not yet working -->

#### Running the vuejs client in another commandline window: http://localhost:8080

```
$ cd client/vue
$ npm install
$ npm run dev
```

To deploy Vuejs client to Firebase 

1. Create a Firebase project and enable email auth, create firestore db, enable storage etc.
2. Execute npm init with all options ON.
3. Add firebase properties in the /client/vue/src/config.js
4. Install all npm packages. 
5. Run "npm run build" and "firebase deploy".


We're also implementing Nuxt.js (WIP).

Note: Vuejs client is a bit behind the reactjs client and we're looking for contributors who can support the development of vuejs client. 


Feel free to create an issue. Kindly include your package.json, OS and browser details.


## Deploying React client to Firebase

Check out README inside /client/react for instructions.


Keep things as simple to understand for others as possible. Also, add comments to any code being contributed.

## To Do List

### Immediate Feature Goals

- [x] Authentication/Authorization using SQLite, Passport and Express
- [x] API Module for SQLite
- [x] Adding New Pages + Menus
- [x] Landing Page Design
- [x] Deployment to Firebase (WIP)
- [x] Unit Tests for local SQLite API
- [x] Logged In Page Design (Dashboard basic)
- [x] Blog Post Index Design
- [x] Blog Post View Design
- [x] Blog settings i.e. changing logo, tagline etc. (WIP)
- [x] Profile Page
- [x] Editor Selection and Integration (using Quill editor)
- [x] Comments Integration (Disqus, Facebook and ?)
- [x] e2e testing using npm run e2e inside /client/vue dir


### Midterm Feature Goals
- [ ] Code coverage testing
- [ ] Page views tracking and reporting
- [ ] React client for Lesspod (Sai is on it)
- [ ] Theming System Design/Dev
- [ ] Plugin System Design/Dev 
- [ ] More Themes 
- [ ] Theme Generator Basic 
- [ ] Menu Editor to re-link existing pages with Menus

### Longterm Feature Goals

- [ ] Desktop client for Lesspod


We accept pull requests. Kindly add comments to your code before sending one.
