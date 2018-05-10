# Lesspod
Serverless Blogging Engine (In Active Development)


## Why Lesspod?

WordPress is a very successful blogging platform which requires servers to host and most of the servers are running over their actual web traffic. Given that 28% of the websites on the internet use WordPress, there are a lot of unused server resources costing us carbon emissions and money. We can reverse this damage by going serverless. Of course, the goal is to make it as simple as possible to host serverless websites and blogs.


## Free Website + Blog for Everyone (Cloud Limits Apply)

Lesspod will enable free websites and blogs for people who don't want to pay for WordPress hosting within free limits offered by cloud providers like Google Firebase and AWS Lambda. Lesspod is a better alternative to static sites which can be difficult to install and manage.

## Choice of building blocks

We want to keep Lesspod as simple as possible for everyone to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (using sequelize ORM locally)
- Express 4 (Most popular node.js framework)
- ~~EJS~~ VueJS (Clean, Fast and Easiest to Learn)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- ~~Parcel.js~~ Webpack 4 as a bundler
- ~~js-cookie npm module~~ Store for local storage: https://www.npmjs.com/package/store


## Contributing To Lesspod

Key software versions. Node: 10.0.0 and NPM: 6.0.0

Running the serverless (server) component: http://localhost:1234/

```
$ git clone https://github.com/Rajan/lesspod.git   //clone repo
$ cd lesspod  //move to project directory
$ npm install //install necessary packages 
$ node -r dotenv/config index.js //setup environment variables
```
Note: some npm modules may need to be installed manually.

parcel index.js // not yet working

Running the vuejs client in another commandline window: http://localhost:8080
```
$ cd client
$ npm install
$ npm run dev
```

Keep things as simple to understand for others as possible. Also, add comments to any code being contributed.

Feel free to create an issue if you face problems. Kindly include your package.json, OS and browser details.


## To Do List

### Immediate Feature Goals

- [x] Authentication/Authorization using SQLite, Passport and Express
- [x] API Module for SQLite
- [ ] Adding New Pages + Menus
- [ ] Landing Page Design
- [ ] Deployment to Firebase (pod deploy firebase)
- [ ] Unit Tests
- [ ] Logged In Page Design (Dashboard basic)
- [x] Blog Post Index Design
- [ ] Blog Post View Design
- [x] Editor Selection and Integration (using Quill editor)
- [ ] Comments Integration (Disqus, Facebook and ?)
- [ ] Code coverage and e2e testing module

### Midterm Feature Goals

- [ ] Page views tracking and reporting
- [ ] React client for Lesspod (Sai is on it)
- [ ] Theming System Design/Dev
- [ ] Plugin System Design/Dev 
- [ ] More Themes 
- [ ] Theme Generator Basic 

### Longterm Feature Goals

- [ ] Desktop client for Lesspod


We accept pull requests. Kindly add comments to your code before sending one.
