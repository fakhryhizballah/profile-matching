const express = require("express");
const routes = express.Router();

const base = require('../controllers/admin');

const middleware = require('../middlewares');


routes.post('/rekomendasi',middleware.admin, base.addRekomendasi);
routes.get('/rekomendasi',middleware.admin, base.getRekomendais);
routes.put('/rekomendasi/:id',middleware.admin, base.editNilai);
routes.delete('/rekomendasi/:id',middleware.admin, base.delNilai);
routes.get('/siswa', middleware.admin, base.getUser);
routes.get('/siswa/:gid', middleware.admin, base.getOneUser);
routes.delete('/siswa/:gid', middleware.admin, base.delUser);
routes.put('/siswa/:gid', middleware.admin, base.editUser);
routes.post('/siswa/:gid', middleware.admin, base.editPassword);


module.exports = routes;
