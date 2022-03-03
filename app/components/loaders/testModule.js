/*!
 * Test Loader
 * This is test file and can be used as an example loader.
 * */
/* eslint no-console: 0 */
export default (element, options) => {
  console.log('Module Loaded', element, options);

  // Testing dynamic Sub Modules (loading only one using the default data-module)
  const subModule = document.querySelector('[data-module="subModule"]')
  if (!subModule) {
    const newMod = document.createElement('div');
    newMod.dataset.module = 'subModule';
    newMod.dataset.name = 'Sub Module';
    document.body.appendChild(newMod);
  }
};
