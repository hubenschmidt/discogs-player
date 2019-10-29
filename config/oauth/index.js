const providers = ["discogs"];

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === "production"
    ? `/auth/${provider}/callback`
    : `https://localhost:5000/auth/${provider}/callback`;
});

const [discogsURL] = callbacks;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "/"
    : ["https://127.0.0.1:3000", "https://localhost:3000"];

exports.DISCOGS_CONFIG = {
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET,
  callbackURL: discogsURL,
  passReqToCallback: true
};
