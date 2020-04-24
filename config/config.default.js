module.exports = appInfo => {
  const config = {};

  // 定义全局中间件
  config.middleware = [];
  config.defaultAppName = appInfo.name || 'react demo';
  config.keys = `${appInfo.name  }yeyu`;
  
  // 配置csrf安全
  // config.security = {
  //   csrf: {

  //   }
  // }

  return config;
}
