# JWT RESTful API Test
## A sample RESTful API secured with JWT built with Passport/Express
### Setup:
- clone the repo
- run `yarn install`/`npm install` to install dependencies
- run `yarn start` to start
- runs on `http://localhost:3000` by default
### Usage:
- There are 3 paths, /login, /signup, and /user/profile
- /login and /signup are public paths that do not require authorization
- /user/profile is a special path that requires a JSON Web Token to be accessed
- In order to receive the JWT token, you must call a POST method on /login with URL-Form-Encoded format, passing it a password
and username as parameters
- If the username/password are verified in the mock database, you will receive a JWT token back as a response
- In order to add a user, you can call a POST on the signup path with URL-Form-Encoded format, passing a username and a password to insert into the mock database