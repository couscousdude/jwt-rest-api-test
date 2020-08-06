const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

require('./auth/auth');

app.use( bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});