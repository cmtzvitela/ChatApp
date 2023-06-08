import { RESTDataSource } from '@apollo/datasource-rest';

export default class UserAPI extends RESTDataSource {
  baseURL = 'http://localhost:3001';

  async createUser(userBody) {
    return await this.post('/signup', { body: userBody });
  }

  async findUserById(userID) {
    return await this.get(`/user/${userID}`);
  }

  async createFriendRequest(friendRequest) {
    console.log('🚀 ~ friendRequest:', friendRequest);
    const friendR = await this.post('/friendRequests', { body: friendRequest });
    console.log('🚀 ~ friendR:', friendR);
    return friendR;
  }
}
