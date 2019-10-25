const providers = ["discogs"];

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === "production"
    ? `/${provider}/callback`
    : `https://localhost:5000/${provider}/callback`;
});

const [discogsURL] = callbacks;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "/"
    : ["https://127.0.0.1:5000", "https://localhost:5000"];

exports.DISCOGS_CONFIG = {
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET,
  callbackURL: discogsURL
};
