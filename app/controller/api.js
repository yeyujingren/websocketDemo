const {Controller} = require('egg');

class Api extends Controller {
  async scgwapi () {
    const {ctx} = this;
    const {authorization} = ctx.request.header;

    const {method} = ctx.request;
    let url; 
    let payload;
    if(method === 'GET') {
      url = ctx.query.url;
      payload = JSON.parse(ctx.query.payload);
    } else {
      url = ctx.request.body.url;
      payload = ctx.request.body.payload;
    }

    const result = await ctx.service.scgwapi.req(url, payload, method, {authorization});
    ctx.set('Content-Type', 'application/json');
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    ctx.set('Expires', 0);
    ctx.body = result;
  }

  async scgwFormApi() {
    const {ctx} = this;
    const {payload} = ctx.request.body;
    const result = await ctx.service.scgwapi.formReq(payload);
    ctx.set('Content-Type', 'application/json');
    ctx.set('Cache-Control', 'np-store, no-cache, must-revalidate');
    ctx.set('Expires', 0);
    ctx.body = result;
  }
}

module.exports = Api;
