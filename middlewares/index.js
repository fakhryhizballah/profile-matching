const jwt = require("jsonwebtoken");
const siswa = require("../controllers/siswa");
module.exports = {
    admin: async (req, res, next) => {
        try {
            const token = req.headers["authorization"];
            let xtoken = token.split(" ")[1];
            const decoded = jwt.verify(xtoken, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            let index = decoded.kd_access.findIndex(item => item.lvid === 1);
            if (index !== -1) {
                next();
              } else {
                res.status(401).json({
                    status: false,
                    message: "Admin not Unauthorized"
                });
              }
           
        } catch (error) {
            res.status(401).json({
                status: false,
                message: "User not Unauthorized"
            });
        }
    },
    siswa: async (req, res, next) => {
        try {
            const token = req.headers["authorization"];
            let xtoken = token.split(" ")[1];
            const decoded = jwt.verify(xtoken, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            let index = decoded.kd_access.findIndex(item => item.lvid === 2);
            if (index !== -1) {
                next();
              } else {
                res.status(401).json({
                    status: false,
                    message: "Siswa not Unauthorized"
                });
              }
           
        } catch (error) {
            res.status(401).json({
                status: false,
                message: "User not Unauthorized"
            });
        }
    }

};