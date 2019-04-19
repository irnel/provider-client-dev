import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Order } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly afs: AngularFirestore) { }

  getAllOrdersByProviderId(providerId) {
    const collection = this.afs.collection(`orders/${providerId}/list`);

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const order = action.payload.doc.data() as Order;
          order.id = action.payload.doc.id;

          return order;
        }
      ))
    );
  }

  update(order: Order) {
    const orderDoc = this.afs.doc(`orders/${order.providerId}/list/${order.id}`);
    return orderDoc.update(order);
  }
}
