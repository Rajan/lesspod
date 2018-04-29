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


## Contributing To Lesspod

```

// running the serverless (server) component
```
$ git clone https://github.com/Rajan/lesspod.git
```

// move to the project directory
```
cd lesspod
```

//Install necessary packages 
```
npm install
```
// Setup environment variables

```
node -r dotenv/config index.js 
```

parcel index.js // not yet working


// running the vuejs client in another commandline window

```
$ cd client
$ npm run dev
```

Keep things as simple to understand for others as possible. Also, add comments to any code being contributed.

Feel free to create an issue if you face problems. Kindly include your package.json, OS and browser details.


### To Do List

- [x] Authentication/Authorization using SQLite, Passport and Express
- [x] API Module for SQLite
- [ ] Landing Page Design
- [ ] Logged In Page Design (Dashboard basic)
- [x] Blog Post Index Design
- [ ] Blog Post View Design
- [x] Editor Selection and Integration (using Quill editor)
- [ ] Comments Integration
- [ ] Adding New Pages + Menus
- [ ] Code coverage and e2e testing module

We accept pull requests. Kindly add comments to your code before sending one.
