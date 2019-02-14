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
    private readonly af: AngularFirestore,
    private readonly notificationService: NotificationService
  ) {

    this.providerCollection = this.af.collection<Provider>('providers');
  }

  async create(provider: Provider) {
    return await this.providerCollection.add(provider).then(async docRef => {
      return await docRef.get().then(async snapshot => {
        const providerDoc = snapshot.data() as Provider;
        providerDoc.id = snapshot.id;

        return providerDoc;
      });
    });
  }

  update(provider: Provider) {
    this.providerDocument = this.af.doc<Provider>(`providers/${provider.id}`);
    this.providerDocument.set(provider);
  }
}
