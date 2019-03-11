import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private userDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  userModel: User;

  constructor(private readonly af: AngularFirestore) {
    this.usersCollection = this.af.collection('users');
  }

  // return all documents with metadata
  getAllUsers() {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;

        return data;
      }))
    );

    return this.users;
  }


  getUserById(uid) {
    return this.af.doc(`users/${uid}`).snapshotChanges().pipe(
      map(snapshot => {
        this.userModel = snapshot.payload.data() as User;
        this.userModel.uid = snapshot.payload.id;

        return this.userModel;
      })
    );
  }

  getUserByEmail(email: string) {
    const collection = this.af.collection(
      'users', query => query.where('email', '==', email).limit(1));

    return collection.get().pipe(
      map(query => query.docs.map(doc => {
        const user = doc.data() as User;
        user.uid = doc.id;

        return user;
      })),
      map(users => users.length > 0 ? users[0] : null)
    );
  }

  isEmailTaken(email: string) {
    return this.getUserByEmail(email).pipe(
      map(user => user ? true : false)
    );
  }

  getUserWithEmailAndPassword(email: string, password: string) {
    const collection = this.af.collection('users', query =>
      query.where('email', '==', email)
           .where('password', '==', password)
           .limit(1));

    return collection.get().pipe(
      map(query => query.docs.map(doc => {
        const user = doc.data() as User;
        user.uid = doc.id;

        return user;
      })),
      map(users => users.length > 0 ? users[0] : null)
    );
  }

  createAccount(user: User) {
    return this.usersCollection.add(user);
  }

  // update(user: User) {
  //   return this.http.put(`/users/${user.id}`, user);
  // }

  // delete(id: number) {
  //   return this.http.delete(`/users/${id}`);
  // }
}
