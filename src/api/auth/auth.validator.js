import { ApolloServerErrorCode } from '@apollo/server/errors';
import PasswordValidator from 'password-validator';
import validator from 'validator';


const passwordSchema = new PasswordValidator()
  .is().min(8)
  .is().max(20)
  .has().letters()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

export const validators = {

  Mutation: {

    login: (resolve, obj, args, context) => {
      const { email } = args;

      if (!validator.isEmail(email)) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Invalid Email address!');
      }

      return resolve(obj, args, context);
    },

    signup: (resolve, obj, args, context) => {
      const { email, password, rePassword } = args.signupReq;

      if (!validator.isEmail(email)) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Invalid Email address!');
      }

      if (password !== rePassword) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Passwords don\'t match!');
      }

      if (!passwordSchema.validate(password)) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT('Password is not strong enough!');
      }

      return resolve(obj, args, context);
    },
  }
};