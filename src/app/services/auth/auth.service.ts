import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../../models';
import { UserService } from '../user/user.service';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly userService: UserService) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, rememberPassword: Boolean) {
    return this.userService.getUserWithEmailAndPassword(email, password).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user ? true : false;
      })
    );
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
