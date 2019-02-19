import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection('products');
  }

  getAllProductsByCategoryId(categoryId) {
    const collection = this.afs.collection(
      'products', query => query.where('categoryId', '==', categoryId));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const product = action.payload.doc.data() as Product;
          product.id = action.payload.doc.id;

          return product;
        }
      ))
    );
  }

  getProductById(id) {
    return this.productCollection.doc(id).snapshotChanges()
      .pipe(
        map(snapshot => {
          const product = snapshot.payload.data() as Product;
          product.id = snapshot.payload.id;

          return product;
        })
      );
  }

  async create(product: Product) {
    return await this.productCollection.add(product).then(async docRef => {
      return await docRef.get().then(async snapshot => {
        const productDoc = snapshot.data() as Product;
        productDoc.id = snapshot.id;

        return productDoc;
      });
    });
  }

  update(product: Product) {
    return this.productCollection.doc(product.id).update(product);
  }

  delete(id) {
    return this.productCollection.doc(id).delete();
  }
}
