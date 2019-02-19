import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Category } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private readonly afs: AngularFirestore) {
    this.categoriesCollection = this.afs.collection('categories');
  }

  getAllCategoriesByProviderId(providerId) {
    const collection = this.afs.collection(
      'categories', query => query.where('providerId', '==', providerId));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const category = action.payload.doc.data() as Category;
          category.id = action.payload.doc.id;

          return category;
        }
      ))
    );
  }

  getCategoryById(categoryId) {
    return this.categoriesCollection.doc(categoryId).snapshotChanges()
      .pipe(
        map(snapshot => {
          const category = snapshot.payload.data() as Category;
          category.id = snapshot.payload.id;

          return category;
        })
      );
  }

  async create(category: Category) {
    return await this.categoriesCollection.add(category).then(async docRef => {
      return await docRef.get().then(async snapshot => {
        const categoryDoc = snapshot.data() as Category;
        categoryDoc.id = snapshot.id;

        return categoryDoc;
      });
    });
  }

  update(category: Category) {
    return this.categoriesCollection.doc(category.id).update(category);
  }

  delete(id) {
    return this.categoriesCollection.doc(id).delete();
  }
}
