import { db } from 'src/__mocks__/db.mock';
import { fakeCache } from './fakeCache';

class FakeApi {
  static REQUEST_TIME = 1000;
  static KEY_CACHE = 'cache';
  static DB = db;

  context = {};

  constructor() {
    const context = fakeCache.getItem(FakeApi.KEY_CACHE);
    if (context) {
      this.context = context;
    }
  }

  static userById = id => FakeApi.DB.find(user => user.id === id);

  #asyncRequest = callback =>
    new Promise(resolve => {
      setTimeout(() => {
        const result = callback();
        resolve(result);
      }, FakeApi.REQUEST_TIME);
    });

  getSession() {
    return this.#asyncRequest(() => this.context.session);
  }

  login() {
    this.context.session = FakeApi.userById(1);
    fakeCache.setItem(FakeApi.KEY_CACHE, this.context);
    return this.getSession();
  }

  logout() {
    this.context = {};
    fakeCache.clear();
    return this.#asyncRequest(() => null);
  }
}

export const fakeApi = new FakeApi();
