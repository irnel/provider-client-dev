import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../../models';
import { Observable } from 'rxjs';
import { map, every, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private userDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  userModel: User;

  constructor(private readonly firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  // return all documents with metadata
  getAllUsers() {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;

        return data;
      }))
    );

    return this.users;
  }


  getUserById(id) {
    this.userDocument = this.firestore.doc(`users/${id}`);

    return this.userDocument;
  }

  getUserByEmail(email: string) {
    const collection = this.firestore.collection(
      'users', query => query.where('email', '==', email).limit(1));

    return collection.get().pipe(
      map(query => query.docs.map(doc => {
        const user = doc.data() as User;
        user.id = doc.id;

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
    const collection = this.firestore.collection('users', query =>
      query.where('email', '==', email)
           .where('password', '==', password)
           .limit(1));

    return collection.get().pipe(
      map(query => query.docs.map(doc => {
        const user = doc.data() as User;
        user.id = doc.id;

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
