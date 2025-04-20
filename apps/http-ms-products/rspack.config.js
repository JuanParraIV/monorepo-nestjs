const { composePlugins, withNx } = require('@nx/rspack');

module.exports = composePlugins(withNx(), (config) => {
  // Asegura que el output sea main.js en la ruta correcta
  return {
    ...config,
    output: {
      ...config.output,
      filename: 'main.js',
    },
  };
});
