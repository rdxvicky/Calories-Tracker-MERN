# Tech Versions 
    node v14.0.0
    npm v6.14.4
    mongo v4.2.6
# Install Client Packages
    cd ./client
    npm i
# Start Client Server
    npm start
# Install MongoDb Packages
# Run Mongo Server Locally with 27017 port
# Install Server Packages
    cd ./server
    npm i
# Start Server Server
    npm start
# Login Page for normal user
    http://localhost:3000
# Login Page for admin user
    http://localhost:3000/admin/login
    user: admin@domain.in  
    pass: 987654321@qQ

# Folder Structure

<pre>
.
├── client
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── actions
│       │   ├── admin.js
│       │   ├── auth.js
│       │   ├── meal.js
│       │   └── profile.js
│       ├── components
│       │   ├── DateRanger.js
│       │   ├── Footer.js
│       │   ├── Header.js
│       │   ├── toaster.js
│       │   └── UnAuthHeader.js
│       ├── conf
│       │   ├── dev.js
│       │   ├── index.js
│       │   └── prod.js
│       ├── constants
│       │   ├── meal.js
│       │   └── profile.js
│       ├── containers
│       │   ├── adminHome.js
│       │   ├── adminLogin.js
│       │   ├── home.js
│       │   ├── index.js
│       │   ├── login.js
│       │   ├── resetpassword.js
│       │   ├── setting.js
│       │   └── signup.js
│       ├── index.css
│       ├── index.js
│       ├── middlewares
│       │   ├── CacheSession.js
│       │   ├── rest.js
│       │   ├── SessionzedContainer.js
│       │   └── UnSessionizedContainer.js
│       ├── reducers
│       │   ├── index.js
│       │   ├── meal.js
│       │   └── profile.js
│       ├── services
│       │   ├── adminServices.js
│       │   ├── authServices.js
│       │   ├── index.js
│       │   ├── mealsServices.js
│       │   └── profileServices.js
│       └── serviceWorker.js
├── README.md
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── Calorie-Tracker.postman_collection.json
    ├── package.json
    └── src
        ├── conf
        │   ├── dev.js
        │   ├── index.js
        │   └── prod.js
        ├── controllers
        │   ├── admin.js
        │   ├── index.js
        │   ├── meal.js
        │   ├── session.js
        │   └── user.js
        ├── middlewares
        │   ├── authFilters.js
        │   └── cachingModule.js
        ├── models
        │   ├── meal.model.js
        │   └── user.model.js
        ├── transactions
        │   ├── admin.transactions.js
        │   ├── meal.transactions.js
        │   └── user.transactions.js
        └── validations
            ├── admin.js
            ├── meal.js
            └── user.js

20 directories, 70 files
</pre>