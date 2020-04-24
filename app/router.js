module.exports = app => {
  const { router, controller } = app;
  // router.get()
  router.all('/**', controller.pages.index);
}
