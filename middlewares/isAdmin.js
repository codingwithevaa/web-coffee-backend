const { User } = require("../models");

async function isAdmin(req, res, next) {
    try {
        const userId = req.userId;

        const checkSeller = await User.findOne({ where: { id: userId } });

        if (checkSeller.isSeller) {
            next();
        } else {
            throw new Error("Anda Bukan Seller");
        }
    } catch (error) {
        next(error);
    }
}

module.exports = isAdmin;