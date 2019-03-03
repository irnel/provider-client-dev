import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

import { Observable, combineLatest } from 'rxjs';
import { DataTransfer } from '../../helpers';
import { map } from 'rxjs/operators';
import { FileInfo } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uploads: DataTransfer [] = [];
  filesCollection: AngularFirestoreCollection;
  storageRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly afs: AngularFirestore,
    ) {
      this.filesCollection = this.afs.collection('filesinfo');
    }

  upload(filesInfo: FileInfo [], model: any) {
    const totalPercentage: Observable<number>[] = [];

    for (const fileInfo of filesInfo) {
      fileInfo.modelId = model.id;

      const basePath = `${fileInfo.modelType}/${fileInfo.createdAt.getTime()}_${fileInfo.name}`;
      this.storageRef = this.storage.ref(basePath);
      this.uploadTask = this.storage.upload(basePath, fileInfo.file);

      const percentage$ = this.uploadTask.percentageChanges();
      totalPercentage.push(percentage$);

      // push each upload into array
      this.uploads.push({
        name: fileInfo.name,
        percentage: percentage$
      });

      this.uploadTask.then(snapshot => {
        return snapshot.ref.getDownloadURL().then(url => {
          return this.filesCollection.add({
           name: fileInfo.name,
           size: fileInfo.size,
           type: fileInfo.type,
           modelType: fileInfo.modelType,
           modelId: fileInfo.modelId,
           url: url,
           createdAt: fileInfo.createdAt,
           markAsPrincipal: fileInfo.markAsPrincipal
          }).then(() => {
            // update image url of model
            if (fileInfo.markAsPrincipal) {
              model.url = url;
              this.afs.doc(`${fileInfo.modelType}/${model.id}`).update(model);
            }
          });
        });
      });
    }

    // All percentages
    return combineLatest(totalPercentage).pipe(
      map(percentages => {
        let result = 0;
        for (const percentage of percentages) {
          result = result + percentage;
        }

        return Math.round(result / percentages.length);
      })
    );
  }

  // add document to images collection
  addFileInfo(fileInfo: FileInfo) {
    this.filesCollection.add(fileInfo);
  }

  getAllFilesInfoByProviderId(id) {
    const collection = this.afs.collection(
      'filesinfo', query => query.where('modelId', '==', id));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(
        action => {
          const file = action.payload.doc.data() as FileInfo;
          file.id = action.payload.doc.id;

          return file;
        }
      ))
    );
  }

  updateFileInfo(file: FileInfo) {
    const modelDoc = this.afs.doc(`${file.modelType}/${file.modelId}`);
    const newFileDoc = this.filesCollection.doc(file.id);
    const fileDoc = this.afs.collection('filesinfo', query =>
      query.where('modelId', '==', file.modelId).where(
        'markAsPrincipal', '==', true));

    fileDoc.get().pipe(
      map(query => query.docs.map(doc => {
        if (doc.exists) {
          // update old file (markAsPrincipal = false)
          doc.ref.update({ markAsPrincipal: false });
        }
      }))
    ).subscribe();

    // run transaction
    return this.afs.firestore.runTransaction(t => {
      return t.get(newFileDoc.ref).then(() => {
        // update new file (markAsPrincipal = true)
        t.update(newFileDoc.ref, { markAsPrincipal: true });
        // update provider url
        t.update(modelDoc.ref, {url: file.url });
      });
    });
  }

  removeFileInfo(file: FileInfo) {
    const fileDoc = this.filesCollection.doc(file.id);

    return this.afs.firestore.runTransaction(t => {
      return t.get(fileDoc.ref).then(() => {
        t.delete(fileDoc.ref);
        // delete file from firebase storage
        this.storage.storage.refFromURL(file.url).delete();
      });
    });
  }
}
