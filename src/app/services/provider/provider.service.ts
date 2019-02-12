import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Provider } from '../../models';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  providerCollection: AngularFirestoreCollection<Provider>;
  providerDocument: AngularFirestoreDocument<Provider>;
  currentProvider: Observable<Provider>;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly notificationService: NotificationService
  ) {

    this.providerCollection = this.firestore.collection('providers');
  }

  create(provider: Provider) {
    return this.providerCollection.add(provider).then(docRef => {
      return docRef.get().then(snapshot => {
        const providerDoc = snapshot.data() as Provider;
        providerDoc.id = snapshot.id;

        return providerDoc;
      });
    });
  }

  update(provider: Provider) {
    this.providerCollection.doc(
      `providers/${provider.id}`).update(provider);
  }
}
