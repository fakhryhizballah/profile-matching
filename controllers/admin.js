
const { rekomendasi_jurusan, User, Previlage, siswa } = require("../models");
const { get } = require("../routes/admin");
module.exports = {
    addRekomendasi: async (req, res) => {
        let data = req.body;
        if (data.kategori != 'IPA' && data.kategori != 'IPS') {
                res.status(400).json({
                    status: false,
                    message: 'kategori harus IPA atau IPS',
                    data: data
                });
        }
        try {
          let add = await rekomendasi_jurusan.create(data)
          console.log(add)
          return res.status(200).json({
                status: true,
                message: 'Data berhasil ditambahkan',
                data: add
            });

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.errors[0].message,
                data: data

            });
        }
    },
    getRekomendais: async (req, res) => {
        try {
            let data = await rekomendasi_jurusan.findAll();
            res.status(200).json({
                status: true,
                message: 'Data berhasil ditampilkan',
                data: data
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    editNilai : async (req, res) => {
        let data = req.body;
        try {
            let edit = await rekomendasi_jurusan.update(data, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                status: true,
                message: 'Data berhasil diubah',
                data: edit
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    delNilai: async(req, res) =>{
        try{
            let hapus = await rekomendasi_jurusan.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                status: true,
                message: 'Data berhasil dihapus',
                data: hapus
            });
        }catch(error){
            res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    getUser: async (req, res) => {
        try {
            let siswa = await Previlage.findAll({
                where: {
                    lvid: 2
                },
                include: [
                    {
                        model: User,
                        as: 'User',
                        attributes: {
                            exclude: ['password', 'gid']
                        }
                    },
                    {
                        model: siswa,
                        as: 'siswa',
                        // attributes: {
                        //     exclude: ['rekomendasi_jurusan_id']
                        // },
                        // include: [
                        //     {
                        //         model: rekomendasi_jurusan,
                        //         as: 'rekomendasi_jurusan'
                        //     }
                        // ]
                    }

                ],
                attributes: {
                    exclude: ['lvid']
                }
            });
            res.status(200).json({
                status: true,
                message: 'Data berhasil ditampilkan',
                data: siswa
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: false,
                message: error
            });
        }
    }
};