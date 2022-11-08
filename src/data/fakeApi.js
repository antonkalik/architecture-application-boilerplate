import { db } from '../__mocks__/db.mock';
import { fakeCache } from './fakeCache';

class FakeApi {
  static REQUEST_TIME = 1000;
  static KEY_CACHE = 'cache';

  session = null;

  constructor() {
    this.session = fakeCache.getItem(FakeApi.KEY_CACHE);
  }

  #asyncRequest = callback =>
    new Promise(resolve => {
      setTimeout(() => {
        const result = callback();
        resolve(result);
      }, FakeApi.REQUEST_TIME);
    });

  getSession() {
    return this.#asyncRequest(() => this.session);
  }

  login(id) {
    this.session = db.find(user => user.id === id);
    fakeCache.setItem(FakeApi.KEY_CACHE, db.find(user => user.id === id));
    return this.getSession();
  }

  logout() {
    this.session = null
    fakeCache.clear();
    return this.#asyncRequest(() => null);
  }
}

export const fakeApi = new FakeApi();
