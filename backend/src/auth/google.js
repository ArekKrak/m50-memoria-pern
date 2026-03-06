const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      `SELECT id, email, display_name
       FROM users
       WHERE id = $1`,
      [id]
    );

    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value ?? null;
        const displayName = profile.displayName ?? null;

        let result = await pool.query(
          `SELECT id, email, display_name
           FROM users
           WHERE google_id = $1`,
          [googleId]
        );

        if (!result.rows.length) {
          result = await pool.query(
            `INSERT INTO users (email, google_id, display_name)
             VALUES ($1, $2, $3)
             RETURNING id, email, display_name`,
            [email, googleId, displayName]
          );
        }

        done(null, result.rows[0]);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;