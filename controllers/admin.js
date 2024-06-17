
const { rekomendasi_jurusan, User, Previlage, siswa } = require("../models");
const { get } = require("../routes/admin");
const bcrypt = require("bcrypt");
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
            if (!data) {
                return res.status(400).json({
                    status: false,
                    message: 'Data tidak ditemukan',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data berhasil ditampilkan',
                data: data
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    getOneRekomendasi: async (req, res) => {
        try {
            let data = await rekomendasi_jurusan.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!data) {
                return res.status(400).json({
                    status: false,
                    message: 'Data tidak ditemukan',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data berhasil ditampilkan',
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
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
            return res.status(200).json({
                status: true,
                message: 'Data berhasil diubah',
                data: edit
            });
        } catch (error) {
            return res.status(400).json({
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
            return res.status(200).json({
                status: true,
                message: 'Data berhasil dihapus',
                data: hapus
            });
        }catch(error){
            return res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    getUser: async (req, res) => {
        try {
            let datasiswa = await Previlage.findAll({
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

                ],
                attributes: {
                    exclude: ['lvid']
                }
            });
            let datasis = datasiswa.map((item) => {
                return {
                    gid: item.gid,
                    username: item.User.username,
                    fullname: item.User.fullname,
                    email: item.User.email,
                    nohp: item.User.nohp,
                    pic: item.User.pic,
                    createdAt: item.createdAt,
                    updatedAt: item.User.updatedAt
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data semua siswa berhasil',
                data: datasis
            });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: false,
                message: error
            });
        }
    },
    getOneUser: async (req, res) => {
        try {
            let usersiswa = await User.findOne({
                where: {
                    gid: req.params.gid
                },
                attributes: {
                    exclude: ['password', 'gid']
                }
            });
            let datasiswa = await siswa.findOne({
                where: {
                    gid: req.params.gid
                },
                attributes: {
                    exclude: ['id', 'gid', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: rekomendasi_jurusan,
                        as: 'rekomendasi_jurusan',
                        attributes: ['nama_juruasan']
                    }
                ],
            });
            if (!datasiswa) {
                datasiswa = {
                    alamat: null,
                    ttl: null,
                    jenis_kelamin: null,
                    agama: null,
                    asal_sekolah: null,
                    nilai_rata_rata: null,
                    rekomendasi_jurusan_id: null,
                    rekomendasi_jurusan: null
                }

            }
            if (!usersiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'Data tidak ditemukan',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data berhasil ditampilkan',
                data: usersiswa,
                datasiswa: datasiswa
            });
        }
        catch (error) {
            res.status(501).json({
                status: false,
                message: "Internal Server Error",
                data: error
            });
        }

    },
    delUser: async (req, res) => {
        try {
            let isExist = await User.findOne({
                where: {
                    gid: req.params.gid
                }
            });
            if (!isExist) {
                return res.status(400).json({
                    status: false,
                    message: 'gid tidak ditemukan',
                    data: null
                });
            }
            let delsiswa = await siswa.destroy({
                where: {
                    gid: req.params.gid
                }
            });
            let del = await User.destroy({
                where: {
                    gid: req.params.gid
                }
            });

            return res.status(200).json({
                status: true,
                message: 'Data berhasil dihapus',
                data: del
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    editUser: async (req, res) => {
        let data = req.body;
        try {
            let isExist = await User.findOne({
                where: {
                    gid: req.params.gid
                }
            });
            if (!isExist) {
                return res.status(400).json({
                    status: false,
                    message: 'gid tidak ditemukan',
                    data: null
                });
            }
            let edit = await User.update(data, {
                where: {
                    gid: req.params.gid
                }
            });
            let editsiswa = await siswa.update(data, {
                where: {
                    gid: req.params.gid
                }
            });

            return res.status(200).json({
                status: true,
                message: 'Data berhasil diubah',
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.errors[0].message
            });
        }
    },
    editPassword: async (req, res) => {
        let data = req.body;
        if (!data.password || !data.confirm_password) {
            return res.status(400).json({
                status: false,
                message: 'password & confirm_password tidak boleh kosong',
                data: data
            });
        }
        if (data.password != data.confirm_password) {
            return res.status(400).json({
                status: false,
                message: 'Password tidak sama',
                data: data
            });
        }
        try {
            let isExist = await User.findOne({
                where: {
                    gid: req.params.gid
                }
            });
            if (!isExist) {
                return res.status(400).json({
                    status: false,
                    message: 'gid tidak ditemukan',
                    data: null
                });
            }
            const hashPassword = await bcrypt.hash(data.confirm_password, 10);
            let edit = await isExist.update({ password: hashPassword }, {
                where: {
                    gid: req.params.gid
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data berhasil diubah',
                data: edit
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            });
        }
    }
};