# Lesspod
Serverless Blogging Engine (In Active Development)


## Why Lesspod?

WordPress is a very successful blogging platform which requires servers to host and most of the servers are running over their actual web traffic. Given that 28% of the websites on the internet use WordPress, there are a lot of unused server resources costing us carbon emissions and money. We could reverse this damage by going serverless. Of course, the goal is to make it as simple as possible to host serverless websites and blogs.



## Choice of building blocks

We want to keep Lesspod as simple as possible for everyone to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (skipping ORM for now)
- Express 4 (most popular node.js framework)
- EJS (Minimal learning curve)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- Parcel.js as a bundler


## Contributing Guidelines

Lesspod uses parcel as a bundler as of now. Just came to know that Parcel doesn't support EJS at this point by default but it will be possible soon with the next version. To get started run following commands.

```git clone https://github.com/Rajan/lesspod.github.com

cd lesspod

npm install

node starter.js

parcel starter.js (not yet working)

```

Feel free to create an issue if you face problems. Kindly include your package.json, OS and browser details.
