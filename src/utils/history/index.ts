import {createBrowserHistory} from 'history';

class MyHistory {
  history: any;

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

  setReactRouterHistory(history: any) {
    this.history = history;
  }
}

export const history = createBrowserHistory({
  basename: '/'
});

const myHistory:MyHistory = new MyHistory(window.history);
myHistory.setReactRouterHistory(history);
export default myHistory;
