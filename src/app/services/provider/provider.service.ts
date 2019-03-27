import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Provider } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  providerCollection: AngularFirestoreCollection<Provider>;

  constructor(private readonly afs: AngularFirestore) {
    this.providerCollection = this.afs.collection('providers');
  }

  getAllProviderByUserId(userId) {
    const collection = this.afs.collection(`providers/${userId}/list`);

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const provider = action.payload.doc.data() as Provider;
          provider.id = action.payload.doc.id;

          return provider;
        })
      )
    );
  }

  getProviderData(userId, providerId) {
    const providerDoc = this.afs.doc(`providers/${userId}/list/${providerId}`);

    return providerDoc.snapshotChanges()
      .pipe(
        map(snapshot => {
          const provider = snapshot.payload.data() as Provider;
          provider.id = snapshot.payload.id;

          return provider;
        })
      );
  }

  async create(provider: Provider) {
    const collection = this.afs.collection(`providers/${provider.userId}/list`);

    return await collection.add(provider).then(async docRef => {
      return await docRef.get().then(async snapshot => {
        const providerDoc = snapshot.data() as Provider;
        providerDoc.id = snapshot.id;

        return providerDoc;
      });
    });
  }

  update(provider: Provider) {
    const providerDoc = this.afs.doc(
      `providers/${provider.userId}/list/${provider.id}`);

    return providerDoc.update(provider);
  }

  delete(provider: Provider) {
    const providerDoc = this.afs.doc(
      `providers/${provider.userId}/list/${provider.id}`);

    return providerDoc.delete();
  }
}
