/* ==================================== *\
|* =========== NPM Packages =========== *|
\* ==================================== */
const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

app.use(bodyParser.json({limit: '50mb'}));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "test",
	cookie: {
		httpOnly: true,
		secure: false
	}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	//console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	//console.log('deseroalizer', user);
  done(null, user);
});


/* ==================================== *\
|* =========== Local Config =========== *|
\* ==================================== */
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';
const server_config = require('/home/ahnhc/nomad_config.json');


/* ==================================== *\
|* =========== Middle Ware ============ *|
\* ==================================== */
const post_middle = require('./modules/post');

app.use(post_middle);


/* ==================================== *\
|* ============== Router ============== *|
\* ==================================== */
const signup = require('./routes/signup');
const login = require('./routes/login');
const auth = require('./routes/auth');
const logout = require('./routes/logout');

app.get('/', (req, res, next) => {
	console.log('req.session', req.session);
	next();
});
app.use('/signup', signup);
app.use('/login', login);
app.use('/login/auth', auth);
app.use('/logout', logout);


/* ==================================== *\
|* ======= Access-Control-Allow ======= *|
\* ==================================== */
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, STATE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.delete('*', (req, res, next) => {
	res.status(404).end();
	res.end();
});
app.options('*', (req, res, next) => {
	res.status(404).end();
	res.end();
});
app.head('*', (req, res, next) => {
	res.status(404).end();
	res.end();
});


async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
