const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'rahasia', // Ganti dengan secret key yang digunakan untuk signing token
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            // Temukan user berdasarkan ID yang ada di token JWT
            const user = await User.findByPk(jwtPayload.id);

            if (user) {
                // Jika user ditemukan, kembalikan user
                return done(null, user);
            } else {
                // Jika user tidak ditemukan
                return done(null, false);
            }
        } catch (error) {
            // Tangani kesalahan jika terjadi saat mencari user
            return done(error, false);
        }
    })
);

module.exports = passport;
