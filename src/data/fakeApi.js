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

  login({ username, password }) {
    this.session = db.find(
      user => user.username === username && user.password === password,
    );
    if (this.session) {
      fakeCache.setItem(FakeApi.KEY_CACHE, this.session);
      return this.getSession();
    } else {
      fakeCache.clear();
      throw new Error('Invalid credentials');
    }
  }

  logout() {
    this.session = null;
    fakeCache.clear();
    return this.#asyncRequest(() => null);
  }
}

export const fakeApi = new FakeApi();
