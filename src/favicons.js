const faviconsContext = require.context(
  "../favicons",
  true,
  /\.(svg|png|ico|xml|json)$/
);
faviconsContext.keys().forEach(faviconsContext);