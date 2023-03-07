import { RESTDataSource } from '@apollo/datasource-rest';

export default class UserAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3001';

  async createUser(userBody: any) {
    return await this.post('/signup', { body: userBody });
  }

  async findUserById() {
    return this.get(`/me`);
  }
}
