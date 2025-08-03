const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this GitHub ID
    let user = await User.findOne({ githubId: profile.id });

    if (user) {
      // Update user info and last login
      user.name = profile.displayName || profile.username;
      user.avatar = profile.photos[0]?.value || null;
      user.githubUsername = profile.username;
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }

    // Check if user exists with same email
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        // Link GitHub account to existing user
        user.githubId = profile.id;
        user.githubUsername = profile.username;
        user.avatar = profile.photos[0]?.value || user.avatar;
        user.provider = 'github';
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }
    }

    // Create new user
    user = new User({
      githubId: profile.id,
      name: profile.displayName || profile.username,
      email: email ? email.toLowerCase() : `${profile.username}@github.local`,
      avatar: profile.photos[0]?.value || null,
      githubUsername: profile.username,
      provider: 'github',
      isEmailVerified: true, // GitHub emails are considered verified
      lastLogin: new Date()
    });

    await user.save();
    done(null, user);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    done(error, null);
  }
}));

module.exports = passport;