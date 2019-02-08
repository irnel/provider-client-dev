import { User } from '../models';
import { Roles } from './enum-roles';

export class Converter {

  // Convert firebase user to user app
  static ToUser(firebaseUser: firebase.User) {
    const user: User = {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      phoneNumber: firebaseUser.phoneNumber,
      photoURL: firebaseUser.photoURL,
      roles: [Roles.Provider],
      emailVerified: firebaseUser.emailVerified,
      refreshToken: firebaseUser.refreshToken,
      uid: firebaseUser.uid
    };

    return user;
  }

}
