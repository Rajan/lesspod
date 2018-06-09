![Lesspod Logotype](https://github.com/Tobaloidee/lesspod/blob/master/images/readme-logo.png)

Serverless Blogging Engine (In Active Development)


## Why Lesspod?

There are 16 million websites being added to the Internet every month. Most websites require servers to host and most of the servers are underutilized. There are a lot of unused server resources costing us carbon emissions and money. We can reverse this damage by going serverless. 

Lesspod's mission is to transition the Internet from server architecture to serverless architecture ASAP. To that end, we're building it as an open source project that anyone can utilize.

Our goal is to make it as simple as possible to host serverless websites and blogs. As we build Lesspod, we stare at the possibility of the serverless Internet.

## Free Forever Web Hosting (Cloud Limits Apply)

Lesspod will enable free websites and blogs for people who don't want to pay for recurring hosting fees within free limits offered by cloud providers like Google Firebase and AWS Lambda. Lesspod is dynamic and offers a better alternative to static sites which can be difficult to install and manage.

## Choice of building blocks

We want to keep Lesspod as simple as possible for everyone to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (using sequelize ORM locally)
- Express 4 (Most popular node.js framework)
- ~~EJS~~ VueJS (Clean, Fast and Easiest to Learn)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- ~~Parcel.js~~ Webpack 3/4 as a bundler
- js-cookie npm module (In future: Store for local storage: https://www.npmjs.com/package/store)


## Contributing To Lesspod

Key software versions. Node: 10.0.0 and NPM: 6.0.0

#### Running the API component: http://localhost:1234/

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

Keep things as simple to understand for others as possible. Also, add comments to any code being contributed.

Feel free to create an issue if you face problems. Kindly include your package.json, OS and browser details.


## Deploying to Firebase (WIP)

Create a firebase_init.txt file in the root with web script tags from your Firebase project.
We've created two utilities for firebase deploy and rollback. fbase_prep.js will inject firebase calls.

```
node fbase_prep.js   // create new git branch and inject firebase scripts
node fbase_cleanup.js   // rollback changes and move back to master branch

```


<!--

#### Running the React client in another commandline window: http://localhost:3000

```
$ cd client/react
$ npm install
$ npm start
```
Note: React client is at a very early stage in the development.

-->


## To Do List

### Immediate Feature Goals

- [x] Authentication/Authorization using SQLite, Passport and Express
- [x] API Module for SQLite
- [x] Adding New Pages + Menus
- [x] Landing Page Design
- [ ] Deployment to Firebase
- [ ] Unit Tests
- [x] Logged In Page Design (Dashboard basic)
- [x] Blog Post Index Design
- [x] Blog Post View Design
- [ ] Blog settings i.e. changing logo, tagline etc.
- [x] Profile Page
- [x] Editor Selection and Integration (using Quill editor)
- [x] Comments Integration (Disqus, Facebook and ?)
- [ ] Code coverage and e2e testing module


### Midterm Feature Goals

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
