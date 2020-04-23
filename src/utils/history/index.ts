import {createBrowserHistory} from 'history';

class MyHistory {
  [x: string]: any;

  constructor(history:any) {
    this.history = history;
  }

  replace(path:any) {
    this.history.replace(path);
  }

  push(path:any) {
    this.history.push(path);
  }

  goBack(num: number = -1) {
    this.history.go(num);
  }
}

export const history = createBrowserHistory({
  basename: '/'
});


const myHistory:MyHistory = new MyHistory(history);
export default myHistory;
