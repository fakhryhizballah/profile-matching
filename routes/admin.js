const express = require("express");
const routes = express.Router();

const base = require('../controllers/admin');

const middleware = require('../middlewares');


routes.post('/rekomendasi',middleware.admin, base.addRekomendasi);
routes.get('/rekomendasi',middleware.admin, base.getRekomendais);
routes.put('/rekomendasi/:id',middleware.admin, base.editNilai);
routes.delete('/rekomendasi/:id',middleware.admin, base.delNilai);
routes.get('/siswa', middleware.admin, base.getUser);


module.exports = routes;
