const {Service} = require('egg');

class SCGatewayApiService extends Service {
  async req(url, payload={}, method = 'POST', extraHeaders) {
    const {ctx} = this;
    const config = ctx.app.config.scgwapi;
    const realurl = `${config.url}${url || ''}`

    ctx.logger.info('================================================');
    ctx.logger.info(method);
    ctx.logger.info(realurl);
    ctx.logger.info(payload);
    ctx.logger.info(extraHeaders);

    const result = await this.app.curl(realurl, {
      method,
      dataAsQueryString: method.toLowerCase() === 'get',
      data: payload,
      contentType: 'json',
      dataType: 'json',
      timeout: 10000,
    })
    ctx.logger.info('[Response]', result.status);
    return result.data;
  }

  async formReq(payload) {
    const {ctx} = this;
    const {url, method, headers, data} = payload;
    const config = ctx.app.config.scgwapi;
    const realurl = `${config.url}${url || ''}`;

    ctx.logger.info(payload);

    const result = await this.app.curl(realurl, {
      method,
      headers: {
        'content-type': 'application/x-www-form-urlencode'
      },
      timeout: 10000,
    })

    this.ctx.logger.info('[Response]', result.status);
    this.ctx.logger.info(result.data);
    return result.data;
  }
}

module.exports = SCGatewayApiService;
