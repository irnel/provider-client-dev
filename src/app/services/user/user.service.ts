import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly af: AngularFirestore) {
    this.usersCollection = this.af.collection('users');
  }

  // return all documents with metadata
  getAllUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const user = a.payload.doc.data() as User;
        user.uid = a.payload.doc.id;

        return user;
      }))
    );
  }

  getAllUsersByType(type) {
    const collection = this.af.collection(
      'users', query => query.where('roles', 'array-contains', type));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const user = action.payload.doc.data() as User;
          user.uid = action.payload.doc.id;

          return user;
        }
      ))
    );
  }

  getUserById(uid) {
    return this.af.doc(`users/${uid}`).snapshotChanges().pipe(
      map(snapshot => {
        const user = snapshot.payload.data() as User;
        user.uid = snapshot.payload.id;

        return user;
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

  update(user: User) {
    return this.usersCollection.doc(user.uid).update(user);
  }

  publish(userId, publish) {
    return this.usersCollection.doc(userId).update({ publish: publish });
  }

  // delete(id: number) {
  //   return this.http.delete(`/users/${id}`);
  // }
}
