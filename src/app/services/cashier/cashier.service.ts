import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Cashier } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  cashierCollection: AngularFirestoreCollection<Cashier>;
  cashierDocument: AngularFirestoreDocument<Cashier>;

  constructor(private afs: AngularFirestore) {
    this.cashierCollection = this.afs.collection('cashiers');
  }

  getAllCashiersByProviderId(providerId) {
    const collection = this.afs.collection(
      'cashiers', query => query.where('providerId', '==', providerId));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const cashier = action.payload.doc.data() as Cashier;
          cashier.id = action.payload.doc.id;

          return cashier;
        }
      ))
    );
  }

  getCashierById(id) {
    return this.cashierCollection.doc(id).snapshotChanges().pipe(
      map(snapshot => {
        const cashier = snapshot.payload.data() as Cashier;
        cashier.id = snapshot.payload.id;

        return cashier;
      })
    );
  }

  create(cashier: Cashier) {
    return this.cashierCollection.add(cashier).then(docRef => {
      return docRef.get().then(snapshot => {
        const cashierDoc = snapshot.data() as Cashier;
        cashierDoc.id = snapshot.id;

        return cashier;
      });
    });
  }

  delete(id) {
    return this.cashierCollection.doc(id).delete();
  }
}
