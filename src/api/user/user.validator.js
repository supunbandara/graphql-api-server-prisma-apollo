import { ApolloServerErrorCode } from '@apollo/server/errors';
import validator from 'validator';


export const validators = {
  Mutation: {
    editUser: (resolve, obj, args, context) => {
      const { email } = args.editUserReq;

      if (!validator.isEmail(email)) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Invalid Email address!');
      }

      return resolve(obj, args, context);
    }
  }
};