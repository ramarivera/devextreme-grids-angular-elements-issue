const concat = require('concat');
const fs = require('fs-extra');

async function buildComponent(componentName: string) {
  const filesToConcat = [
    `./dist/${componentName}/runtime-es2015.js`,
    `./dist/${componentName}/polyfills-es2015.js`,
    `./dist/${componentName}/scripts.js`,
    `./dist/${componentName}/main-es2015.js`
  ];

  const filesToCopy = ['dxicons.ttf', 'dxicons.woff', 'dxicons.woff2', 'styles.css'];

  await fs.ensureDir('./dist/elements');

  await Promise.all(
    filesToCopy.map(async file => {
      await fs.copy(`./dist/${componentName}/${file}`, `./dist/elements/${file}`);
    })
  );

  return concat(filesToConcat, './dist/elements/mpm-grid.js');
}

buildComponent('mpm-grids').then(() => {
  console.log('DONE');
});
