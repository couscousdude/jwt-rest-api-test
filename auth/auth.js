const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const users = require('../db/users');

passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await users.signup(username, password);
        return done(null, user);
    } catch(err) {
        console.log(`An error occurred: ${err}`);
        done(err);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const validUser = await users.login(username, password);

        if ( !validUser ) { return done(null, false, { message: 'Unauthorized' }) }
        
        return done(null, validUser, { message: 'Logged in successfully'} );
    } catch(error) {
        console.log(`An error occurred: ${error}`);
        return done(error);
    }
}));

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async(token, done) => {
    try {
        return done(null, token.user);
    } catch(error) {
        done(error);
    }
}));