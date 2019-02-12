import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { SnotifyService } from 'ng-snotify';
import { auth, firestore } from 'firebase';

import { User } from '../../models';
import { Converter } from '../../helpers/converter';
import { Roles } from './../../helpers/enum-roles';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly toast: SnotifyService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {

     /* Saving user data in local storage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        localStorage.setItem(
          'user', JSON.stringify(Converter.ToUser(firebaseUser)));
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
        const user = Converter.ToUser(credential.user);
        this.currentUserSubject.next(user);

        return user;
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
        const user = Converter.ToUser(credential.user);
        this.currentUserSubject.next(user);

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

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.emailVerified) ? true : false;
  }

  showErrorMessage(message: string, title: string, time: number) {
    this.toast.error(message, title, {
      backdrop: 0.2,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeout: time
    });
  }
}
