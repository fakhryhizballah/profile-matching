const { rekomendasi_jurusan, nilai, User, siswa } = require("../models");
const { get } = require("../routes/admin");
module.exports = {
    addNilai: async (req, res) => {
        let data = req.body;
        let isExist = await siswa.findOne({
            where: {
                gid: req.user.gid,
            },
        });
        if (!isExist) {
            return res.status(400).json({
                status: false,
                message: "Lengkapi biodata anda terlebih dahulu",
                data: null,
            });
        }
        if (data.kategori != "IPA" && data.kategori != "IPS") {
            res.status(400).json({
                status: false,
                message: "kategori harus IPA atau IPS",
                data: data,
            });
        }

        let cekNilai = await nilai.findOne({
            where: {
                gid: req.user.gid,
            },
        });
        if (!cekNilai) {
            await nilai.create({
                gid: req.user.gid,
                kategori: data.kategori,
                matematika: data.matematika,
                bahasa_indonesia: data.bahasa_indonesia,
                bahasa_inggris: data.bahasa_inggris,
                fisika: data.fisika,
                kimia: data.kimia,
                biologi: data.biologi,
                geografi: data.geografi,
                ekonomi: data.ekonomi,
                sosiologi: data.sosiologi,
                sejarah: data.sejarah,
            });
            return res.status(400).json({
                status: false,
                message: "Nilai berhasil ditambahkan",
                data: data,
            });
        }
        let edit = await nilai.update(data, {
            where: {
                gid: req.user.gid,
            },
        });
        return res.status(200).json({
            status: true,
            message: "Data berhasil ditambahkan",
            data: data,
        });
    },
    getNilai: async (req, res) => {
        try {
            let data = await nilai.findOne({
                where: {
                    gid: req.user.gid,
                },
            });
            if (!data) {
                return res.status(208).json({
                    status: true,
                    message: "Data nilai anda belum diinputkan",
                    data: null,
                });
            }
            res.status(200).json({
                status: true,
                message: "Data berhasil ditampilkan",
                data: data,
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error,
            });
        }
    },
    getRekomendasijurusan: async (req, res) => {
        try {
            let nilaiSiswa = await nilai.findOne({
                where: {
                    gid: req.user.gid,
                },
            });
            if (!nilaiSiswa) {
                return res.status(208).json({
                    status: true,
                    message: "Masukkan nilai anda terlebih dahulu",
                    data: null,
                });
            }
            let rekomendasi = await rekomendasi_jurusan.findAll({
                where: {
                    kategori: nilaiSiswa.kategori,
                },
            });
            if (nilaiSiswa.kategori == "IPS") {
                rekomendasi = rekomendasi.filter((item) => {
                    return (
                        item.matematika <= nilaiSiswa.matematika &&
                        item.bahasa_indonesia <= nilaiSiswa.bahasa_indonesia &&
                        item.bahasa_inggris <= nilaiSiswa.bahasa_inggris &&
                        item.geografi <= nilaiSiswa.geografi &&
                        item.ekonomi <= nilaiSiswa.ekonomi &&
                        item.sosiologi <= nilaiSiswa.sosiologi
                    );
                });
            }
            if (nilaiSiswa.kategori == "IPA") {
                rekomendasi = rekomendasi.filter((item) => {
                    return (
                        item.matematika <= nilaiSiswa.matematika &&
                        item.bahasa_indonesia <= nilaiSiswa.bahasa_indonesia &&
                        item.bahasa_inggris <= nilaiSiswa.bahasa_inggris &&
                        item.fisika <= nilaiSiswa.fisika &&
                        item.kimia <= nilaiSiswa.kimia &&
                        item.biologi <= nilaiSiswa.biologi
                    );
                });
            }
            if (rekomendasi.length == 0) {
                return res.status(208).json({
                    status: true,
                    message: "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                    data: null,
                });
            }
            let dataRekomendasi = rekomendasi.map((item) => {
                return {
                    jurusan: item.nama_juruasan,
                };
            });
            return res.status(200).json({
                status: true,
                message: "Rekomendasi Jurusan anda",
                data: dataRekomendasi

            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error,
            });
        }
    },
    getScoreRekomendasi: async (req, res) => {
        try {
            let nilaiSiswa = await nilai.findOne({
                where: {
                    gid: req.user.gid,
                },
            });
            if (!nilaiSiswa) {
                return res.status(208).json({
                    status: true,
                    message: "Masukkan nilai anda terlebih dahulu",
                    data: null,
                });
            }
            let rekomendasi = await rekomendasi_jurusan.findAll({
                where: {
                    kategori: nilaiSiswa.kategori,
                },
            });
            let passingGrade = await rekomendasi_jurusan.findAll({
                where: {
                    kategori: nilaiSiswa.kategori,
                },
            });

            let dataRekomendasi = [];
            if (nilaiSiswa.kategori == "IPS") {
                rekomendasi = rekomendasi.filter((item) => {
                    return (
                        item.matematika <= nilaiSiswa.matematika &&
                        item.bahasa_indonesia <= nilaiSiswa.bahasa_indonesia &&
                        item.bahasa_inggris <= nilaiSiswa.bahasa_inggris &&
                        item.geografi <= nilaiSiswa.geografi &&
                        item.ekonomi <= nilaiSiswa.ekonomi &&
                        item.sosiologi <= nilaiSiswa.sosiologi
                    );
                });
                for (const element of rekomendasi) {
                    let score = 0;
                    let geografi = (nilaiSiswa.geografi - element.geografi) / (100 - element.geografi);
                    let ekonomi = (nilaiSiswa.ekonomi - element.ekonomi) / (100 - element.ekonomi);
                    let sosiologi = (nilaiSiswa.sosiologi - element.sosiologi) / (100 - element.sosiologi);
                    let matematika = (nilaiSiswa.matematika - element.matematika) / (100 - element.matematika);
                    let bahasa_indonesia = (nilaiSiswa.bahasa_indonesia - element.bahasa_indonesia) / (100 - element.bahasa_indonesia);
                    let bahasa_inggris = (nilaiSiswa.bahasa_inggris - element.bahasa_inggris) / (100 - element.bahasa_inggris);
                    score = geografi + ekonomi + sosiologi + sejarah + matematika + bahasa_indonesia + bahasa_inggris;
                    dataRekomendasi.push({
                        id: element.id,
                        jurusan: element.nama_juruasan,
                        score: score.toFixed(2),
                        geografi: geografi,
                        ekonomi: ekonomi,
                        sosiologi: sosiologi,
                        matematika: matematika,
                        bahasa_indonesia: bahasa_indonesia,
                        bahasa_inggris: bahasa_inggris
                    });

                }
                // order by score
                dataRekomendasi.sort((a, b) => {
                    return b.score - a.score;
                });
                if (rekomendasi.length == 0) {
                    return res.status(208).json({
                        status: true,
                        message:
                            "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                        data: null,
                    });
                }
                await siswa.update({
                    nilai_rata_rata: dataRekomendasi[0].score,
                    rekomendasi_jurusan_id: dataRekomendasi[0].jurusan
                }, {
                    where: {
                        gid: req.user.gid
                    }
                });
              return  res.status(200).json({
                    status: true,
                  message: "Rekomendasi Jurusan anda IPS",
                    data: dataRekomendasi,
                  nilaiSiswa,
                  passingGrade
                });
            }
            if (nilaiSiswa.kategori == "IPA") {
                rekomendasi = rekomendasi.filter((item) => {
                    return (
                        item.matematika <= nilaiSiswa.matematika &&
                        item.bahasa_indonesia <= nilaiSiswa.bahasa_indonesia &&
                        item.bahasa_inggris <= nilaiSiswa.bahasa_inggris &&
                        item.fisika <= nilaiSiswa.fisika &&
                        item.kimia <= nilaiSiswa.kimia &&
                        item.biologi <= nilaiSiswa.biologi
                    );
                });
                for (const element of rekomendasi) {
                    let score = 0;
                    let fisika = (nilaiSiswa.fisika - element.fisika) / (100 - element.fisika);
                    let kimia = (nilaiSiswa.kimia - element.kimia) / (100 - element.kimia);
                    let biologi = (nilaiSiswa.biologi - element.biologi) / (100 - element.biologi);
                    let matematika = (nilaiSiswa.matematika - element.matematika) / (100 - element.matematika);
                    let bahasa_indonesia = (nilaiSiswa.bahasa_indonesia - element.bahasa_indonesia) / (100 - element.bahasa_indonesia);
                    let bahasa_inggris = (nilaiSiswa.bahasa_inggris - element.bahasa_inggris) / (100 - element.bahasa_inggris);
                    score = fisika + kimia + biologi + matematika + bahasa_indonesia + bahasa_inggris;
                    dataRekomendasi.push({
                        id: element.id,
                        jurusan: element.nama_juruasan,
                        score: score.toFixed(2),
                        fisika: fisika,
                        kimia: kimia,
                        biologi: biologi,
                        matematika: matematika,
                        bahasa_indonesia: bahasa_indonesia,
                        bahasa_inggris: bahasa_inggris
                    });

                }
                // order by score
                dataRekomendasi.sort((a,b) => {
                    return b.score - a.score;
                });
                if (rekomendasi.length == 0) {
                    return res.status(208).json({
                        status: true,
                        message:
                            "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                        data: null,
                    });
                }
                await siswa.update({
                    nilai_rata_rata: dataRekomendasi[0].score,
                    rekomendasi_jurusan_id: dataRekomendasi[0].id
                }, {
                    where: {
                        gid: req.user.gid
                    }
                });
                return res.status(200).json({
                    status: true,
                    message: "Rekomendasi Jurusan anda IPA",
                    data: dataRekomendasi,
                    nilaiSiswa,
                    passingGrade,

                });
            }

        } catch (error) {
            console.log("error");
            console.log(error);
            res.status(400).json({
                status: false,
                message: error,
            });
        }
    },
    getBiodata: async (req, res) => {
        try {
            let getBiodata = await User.findOne({
                where: {
                    gid: req.user.gid,
                },
                attributes: ["gid", "username", "fullname", "email", "nohp", 'pic']
            });
            let biodataSiswa = await siswa.findOne({
                where: {
                    gid: req.user.gid,
                },
                include: [{
                    model: rekomendasi_jurusan,
                    as: "rekomendasi_jurusan",
                    attributes: ["nama_juruasan"],
                }],
                attributes: {
                    exclude: ["id", "rekomendasi_jurusan_id", "createdAt", "updatedAt"],
                },
            });
            if (!biodataSiswa) {
                let data = {
                    gid: getBiodata.gid,
                    username: getBiodata.username,
                    fullname: getBiodata.fullname,
                    email: getBiodata.email,
                    nohp: getBiodata.nohp,
                    pic: getBiodata.pic,
                    alamat: null,
                    ttl: null,
                    jenis_kelamin: null,
                    agama: null,
                    asal_sekolah: null,
                    nilai_rata_rata: null,
                    rekomendasi_jurusan: null,
                };
                return res.status(208).json({
                    status: true,
                    message: "Ups, biodata anda belum lengkap, silahkan lengkapi biodata anda",
                    data: data,
                });
            }
            let datasis = {
                ...biodataSiswa.dataValues,
                ...getBiodata.dataValues,
            };
            res.status(200).json({
                status: true,
                message: "Data berhasil ditampilkan",
                data: datasis
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error,
            });
        }
    },
    addBiodata: async (req, res) => {
        let data = req.body;
        try {
            let findBio = await siswa.findOne({
                where: {
                    gid: req.user.gid,
                },
            });
            if (!findBio) {
                let biodata = await siswa.create({
                    gid: req.user.gid,
                    alamat: data.alamat,
                    ttl: data.ttl,
                    jenis_kelamin: data.jenis_kelamin,
                    agama: data.agama,
                    asal_sekolah: data.asal_sekolah,
                });
                return res.status(200).json({
                    status: true,
                    message: "Biodata berhasil ditambahkan",
                    data: biodata,
                });
            }
            // let biodata = await siswa.update(data, {
            //     where: {
            //         gid: req.user.gid,
            //     },
            // });
            await findBio.update(data);
            // let datasis = {
            //     ...data,
            //     ...findBio,
            //     createdAt: findBio.createdAt,
            //     updatedAt: findBio.updatedAt
            // }
            res.status(200).json({
                status: true,
                message: "Biodata berhasil diupdate",
                data: findBio,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error,
            });
        }
    }
};
