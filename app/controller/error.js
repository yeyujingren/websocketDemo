const {Controller} = require('egg');

class ErrorController extends Controller {
  unauthorized () {
    this.ctx.status = 401;
    this.ctx.body = 'Unauthorized';
  }
}
module.exports = ErrorController;
