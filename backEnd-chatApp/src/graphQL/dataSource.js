import { RESTDataSource } from 'apollo-datasource-rest';

export default class UserAPI extends RESTDataSource {
  
  constructor(options = {}) {
    super(options);
    this.baseURL = 'http://localhost:3001';
  }

  static async createUser(userBody) {
    return this.post('/signup', userBody);
  }

  // getUser(userId) {
  //   return this.findOneById(userId);
  // }
}
