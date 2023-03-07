import { RESTDataSource } from '@apollo/datasource-rest';
export default class UserAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'http://localhost:3001';
    }
    async createUser(userBody) {
        return await this.post('/signup', { body: userBody });
    }
    async findUserById() {
        return this.get(`/me`);
    }
}
