const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { users: services} = require('../services');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(settings, async (payload, done) => {
  console.log(payload);
  try {
    const user = await services.getOne({ _id: payload.id });
    if (!user) {
      return done(new Error('User not found'));
    }
    return done(null, user);
  } catch (e) {
    done(e);      
  }
});

passport.use('jwt', jwtStrategy);