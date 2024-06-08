module.exports = {
    home: (req, res) => {
        res.status(200).json({
            status: true,
            message: 'welcome to api PROFILE MATCHING BERBASIS WEB',
            Headers: req.headers['authorization']
        });
    }
};
