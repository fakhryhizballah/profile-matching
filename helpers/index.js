module.exports = {
    validEmail: (email) => {
        // email validation regex
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}