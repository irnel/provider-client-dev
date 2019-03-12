import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';

import { User } from '../../models';
import { Converter } from '../../helpers/converter';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { Roles } from '../../helpers/enum-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {

     /* Saving user data in local storage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userService.getUserById(firebaseUser.uid).subscribe(
          user => localStorage.setItem('user', JSON.stringify(user))
        );
      } else {
        localStorage.setItem('user', null);
      }
    });

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        return this.userService.getUserById(credential.user.uid).subscribe(
          user => {
            this.currentUserSubject.next(user);

            return user;
          }
        );
      });
  }

  // Sign up with email/password
  SignUp(data) {
    const user = data as User;
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        this.SendVerificationMail();
        // update data
        user.emailVerified = credential.user.emailVerified;
        user.refreshToken = credential.user.refreshToken;
        user.uid = credential.user.uid;

        this.SetUserData(user);
        return user;
      });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        const user: User = {
          displayName: credential.user.displayName,
          email: credential.user.email,
          phoneNumber: credential.user.phoneNumber,
          photoURL: credential.user.photoURL,
          enable: false,
          roles: [Roles.Provider],
          emailVerified: credential.user.emailVerified,
          refreshToken: credential.user.refreshToken,
          uid: credential.user.uid
        };

        this.SetUserData(user);
        return user;
      })
      .catch(error => {
        this.notificationService.ErrorMessage(error.message, '', 2500);
      });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // Reset Forgot password
  ForgotPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    const userDoc: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    userDoc.set(user, { merge: true });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
    });
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    const index = this.currentUserSubject.value.roles.findIndex(role => role === Roles.Admin);
    return index !== -1;
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.emailVerified) ? true : false;
  }
}
