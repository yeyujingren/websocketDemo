module.exports = app => {
  const { router, controller } = app;
  router.all('/**', controller.pages.index)
}
