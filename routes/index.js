const express = require("express");
const routes = express.Router();

const base = require('../controllers');
const auth = require('../controllers/AuthController');

// const middleware = require('../middlewares');

routes.get('/', base.home);

routes.post('/auth/register', auth.register);
routes.post('/auth/login', auth.login);
routes.put('/auth/refresh', auth.refresh);
routes.get('/auth/level', auth.level);
routes.put('/auth/forgot', auth.forgot);


module.exports = routes;
