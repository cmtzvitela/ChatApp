import { RESTDataSource } from '@apollo/datasource-rest';

export default class ChatAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3005';
  }

  async getMessages(conversationID) {
    return this.get(`message/${conversationID}`);
  }

  async createMessage(newMessage) {
    return this.post(`message`, { body: newMessage });
  }

  async getConversation(participantObject) {
    console.log('🚀 ~ participantObject:', participantObject);
    return this.get(`chat/${participantObject.participant1}&${participantObject.participant2}`);
  }
  async createConversation(participantObject) {
    console.log('inside Create Conversation');
    return this.post(`chat/${participantObject.participant1}&${participantObject.participant2}`);
  }
  async createGroupConversation(groupConversationObject) {
    console.log('🚀 ~ groupConversationObject in dataSource:', groupConversationObject);
    return this.post(`groupChat`, { body: groupConversationObject });
  }
}
