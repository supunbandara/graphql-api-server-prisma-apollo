import DataLoader from 'dataloader';
import { userService } from '../services/user.service.js';

export class UserDataLoader extends DataLoader {

  constructor() {
    const batchLoader = async userIds => {
      const users = await userService.findByIds(userIds);
        return userIds.map(
            userId => users.filter(user => user.id === userId)[0]
        );
    };

    super(batchLoader);
  }

  static getInstance(context) {
    if (!context.userDataLoader) {
      context.userDataLoader = new UserDataLoader();
    }

    return context.userDataLoader;
  }

}