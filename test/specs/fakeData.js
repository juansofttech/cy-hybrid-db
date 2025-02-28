
import faker from 'faker';

export default {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  searchQuery: faker.random.word()
};