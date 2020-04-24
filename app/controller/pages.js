const {Controller} = require('egg');

class PagesController extends Controller {
  async index() {
    const {ctx} = this;
    const message = 'HI,Im egg'
    ctx.body = message;
  }
}

module.exports = PagesController;
