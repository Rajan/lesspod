# Lesspod
Serverless Blogging Engine (In Active Development)


## Why Lesspod?

WordPress is a very successful blogging platform which requires servers to host and most of the servers are running over their actual web traffic. Given that 28% of the websites on the internet use WordPress, there are a lot of unused server resources costing us carbon emissions and money. We can reverse this damage by going serverless. Of course, the goal is to make it as simple as possible to host serverless websites and blogs.


## Free Website + Blog for Everyone (Cloud Limits Apply)

Lesspod will enable free websites and blogs for people who don't want to pay for WordPress hosting within free limits offered by cloud providers like Google Firebase and AWS Lambda. This is amazing because this project has the potential to double the size of the internet. We'll see a lot more new content on the internet. Fun times ahead!

## Choice of building blocks

We want to keep Lesspod as simple as possible for everyone to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (using sequelize ORM locally)
- Express 4 (Most popular node.js framework)
- EJS (Minimal learning curve)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- Parcel.js as a bundler


## Contributing To Lesspod

Lesspod uses parcel as a bundler as of now. Parcel doesn't support EJS at this point by default but it will be possible soon with the next version. Run following commands to get started. We accept pull requests.

```
git clone https://github.com/Rajan/lesspod.github.com

cd lesspod

npm install

node -r dotenv/config index.js 

parcel index.js // not yet working

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
- [ ] Editor Selection and Integration
- [ ] Comments Integration
- [ ] Adding New Pages + Menus
- [ ] Code coverage and e2e testing module

We accept pull requests. Kindly add comments to your code before sending one.
