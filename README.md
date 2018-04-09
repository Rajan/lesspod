# podisto
Serverless Blogging Engine (In Active Development)


** Why Podisto? **

WordPress is a very successful blogging platform which requires servers to host and most of the servers are running over their actual web traffic. Given that 28% of the websites on the internet uses WordPress, there are a lot of unused server resources costing us carbon emissions and money. We could reverse this damage by going serverless. Of course, the goal is to make it as simple as possible to host serverless websites and blogs.



** Choice of building blocks **

We want to keep Podisto as simple as possible for people to customize and build upon and it requires us to be as minimalist as practically posible.

- SQLite 3 (skipping ORM for now)
- Express 4 (most popular node.js framework)
- DoT.js for templating engine (very tiny + partials support)
- Serverless support (aws/firebase/azure etc)
- Bulma CSS framework for design
- Parcel.js as a bundler
