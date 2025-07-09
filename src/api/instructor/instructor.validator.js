import { ApolloServerErrorCode } from '@apollo/server/errors';


export const validators = {

  Query: {

    instructors: (resolve, obj, args, context) => {
      const { first, offset } = args;

      if (first && !(first >= 1 && first <= 100)) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('You can query maximum 100 records!');
      }
      if (offset && offset < 1) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Offset must be a positive integer!');
      }

      return resolve(obj, args, context);
    }
  }
};