const express = require("express");
const routes = express.Router();

const base = require('../controllers/siswa');

const middleware = require('../middlewares');


routes.post('/nilai',middleware.siswa, base.addNilai);
routes.get('/nilai',middleware.siswa, base.getNilai);
routes.get('/rekomendasi',middleware.siswa, base.getRekomendasijurusan);
routes.get('/rekomendasi/score',middleware.siswa, base.getScoreRekomendasi);
routes.get('/biodata',middleware.siswa, base.getBiodata);
routes.post('/biodata',middleware.siswa, base.addBiodata);
routes.get('/bobot/score', middleware.siswa, base.boBotScore);


module.exports = routes;
