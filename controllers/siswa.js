const { rekomendasi_jurusan, nilai, User, siswa } = require("../models");
const { get } = require("../routes/admin");
module.exports = {
    addNilai: async (req, res) => {
        let data = req.body;
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
                return res.status(201).json({
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
                        item.sosiologi <= nilaiSiswa.sosiologi &&
                        item.sejarah <= nilaiSiswa.sejarah
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
                return res.status(201).json({
                    status: true,
                    message:
                        "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                    data: null,
                });
            }
            res.status(200).json({
                status: true,
                message: "Rekomendasi Jurusan anda",
                data: rekomendasi,
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
                return res.status(201).json({
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

            let dataRekomendasi = [];
            if (nilaiSiswa.kategori == "IPS") {
                rekomendasi = rekomendasi.filter((item) => {
                    return (
                        item.matematika <= nilaiSiswa.matematika &&
                        item.bahasa_indonesia <= nilaiSiswa.bahasa_indonesia &&
                        item.bahasa_inggris <= nilaiSiswa.bahasa_inggris &&
                        item.geografi <= nilaiSiswa.geografi &&
                        item.ekonomi <= nilaiSiswa.ekonomi &&
                        item.sosiologi <= nilaiSiswa.sosiologi &&
                        item.sejarah <= nilaiSiswa.sejarah
                    );
                });
                for (let i = 0; i < rekomendasi.length; i++) {
                    let score = 0;
                    let geografi = (nilaiSiswa.geografi - rekomendasi[i].geografi) / (100 - rekomendasi[i].geografi);
                    let ekonomi = (nilaiSiswa.ekonomi - rekomendasi[i].ekonomi) / (100 - rekomendasi[i].ekonomi);
                    let sosiologi = (nilaiSiswa.sosiologi - rekomendasi[i].sosiologi) / (100 - rekomendasi[i].sosiologi);
                    let sejarah = (nilaiSiswa.sejarah - rekomendasi[i].sejarah) / (100 - rekomendasi[i].sejarah);
                    let matematika = (nilaiSiswa.matematika - rekomendasi[i].matematika) / (100 - rekomendasi[i].matematika);
                    let bahasa_indonesia = (nilaiSiswa.bahasa_indonesia - rekomendasi[i].bahasa_indonesia) / (100 - rekomendasi[i].bahasa_indonesia);
                    let bahasa_inggris = (nilaiSiswa.bahasa_inggris - rekomendasi[i].bahasa_inggris) / (100 - rekomendasi[i].bahasa_inggris);
                    score = geografi + ekonomi + sosiologi + sejarah + matematika + bahasa_indonesia + bahasa_inggris;
                    dataRekomendasi.push({
                        jurusan: rekomendasi[i].nama_juruasan,
                        score: score,
                        geografi: geografi,
                        ekonomi: ekonomi,
                        sosiologi: sosiologi,
                        sejarah: sejarah

                    });

                }
                // order by score
                dataRekomendasi.sort((a, b) => {
                    return b.score - a.score;
                });
                if (rekomendasi.length == 0) {
                    return res.status(201).json({
                        status: true,
                        message:
                            "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                        data: null,
                    });
                }
              return  res.status(200).json({
                    status: true,
                    message: "Rekomendasi Jurusan anda",
                    data: dataRekomendasi,
                    nilaiSiswa,
                    rekomendasi
                });
            }
            if (nilaiSiswa.kategori == IPA){
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
                for (let i = 0; i < rekomendasi.length; i++) {
                    let score = 0;
                    let fisika = (nilaiSiswa.fisika - rekomendasi[i].fisika) / (100 - rekomendasi[i].fisika);
                    let kimia = (nilaiSiswa.kimia - rekomendasi[i].kimia) / (100 - rekomendasi[i].kimia);
                    let biologi = (nilaiSiswa.biologi - rekomendasi[i].biologi) / (100 - rekomendasi[i].biologi);
                    let matematika = (nilaiSiswa.matematika - rekomendasi[i].matematika) / (100 - rekomendasi[i].matematika);
                    let bahasa_indonesia = (nilaiSiswa.bahasa_indonesia - rekomendasi[i].bahasa_indonesia) / (100 - rekomendasi[i].bahasa_indonesia);
                    let bahasa_inggris = (nilaiSiswa.bahasa_inggris - rekomendasi[i].bahasa_inggris) / (100 - rekomendasi[i].bahasa_inggris);
                    score = fisika + kimia + biologi + matematika + bahasa_indonesia + bahasa_inggris;
                    dataRekomendasi.push({
                        jurusan: rekomendasi[i].nama_juruasan,
                        score: score,
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
                }
                );
                if (rekomendasi.length == 0) {
                    return res.status(201).json({
                        status: true,
                        message:
                            "Tidak ada rekomendasi jurusan yang sesuai dengan nilai anda",
                        data: null,
                    });
                }
                return res.status(200).json({
                    status: true,
                    message: "Rekomendasi Jurusan anda",
                    data: dataRekomendasi,
                    nilaiSiswa,
                    rekomendasi
                });
            }
           
            
        } catch (error) {
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
            });
            if (!biodataSiswa) {
                return res.status(200).json({
                    status: true,
                    message: "Ups, biodata anda belum lengkap, silahkan lengkapi biodata anda",
                    data: getBiodata,
                });
            }
            res.status(200).json({
                status: true,
                message: "Data berhasil ditampilkan",
                data: {
                    biodata: biodataSiswa,
                    user: getBiodata
                },
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
            let biodata = await siswa.update(data, {
                where: {
                    gid: req.user.gid,
                },
            });
            // let biodata = await siswa.create({
            // gid: req.user.gid,
            // alamat: data.alamat,
            // ttl: data.ttl,
            // jenis_kelamin: data.jenis_kelamin,
            // agama: data.agama,
            // asal_sekolah: data.asal_sekolah,
            // });
            res.status(200).json({
                status: true,
                message: "Biodata berhasil ditambahkan",
                data: biodata,
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error,
            });
        }
    }
};
