const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const { primaryColor } = require('./src/variables')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': primaryColor },
  }),
);