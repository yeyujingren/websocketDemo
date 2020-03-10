const Controller = require('egg').Controller;

class PagesController extends Controller {
  async index() {
    const {ctx} = this;
    const message = 'HI,Im egg'
    ctx.body = message;
  }
}

module.exports = PagesController;
