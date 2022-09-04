import { db } from '../__mocks__/db.mock';
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

  getUser(user_id) {
    return this.#asyncRequest(() => {
      const user = FakeApi.userById(user_id);
      return user
        ? {
            id: user.id,
            title: user.username,
            email: user.email,
          }
        : null;
    });
  }

  getPosts(user_id) {
    return this.#asyncRequest(() => {
      const user = FakeApi.userById(user_id);
      return user?.posts || null;
    });
  }
}

export const fakeApi = new FakeApi();
