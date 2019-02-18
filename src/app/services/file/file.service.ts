import { NotificationService } from './../notification/notification.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

import { Observable, combineLatest } from 'rxjs';
import { FileInfo, DataTransfer } from '../../helpers';
import { ImageInfo } from './../../models';
import * as firebase from 'firebase';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uploads: DataTransfer [] = [];

  storageRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  constructor(
    private readonly afs: AngularFireStorage,
    private readonly af: AngularFirestore,
    private readonly notification: NotificationService
    ) { }

  upload(filesInfo: FileInfo [], model: any) {
    const totalPercentage: Observable<number>[] = [];

    for (const fileInfo of filesInfo) {
      fileInfo.modelId = model.id;

      const basePath = `${fileInfo.type}/${fileInfo.createdAt.getTime()}_${fileInfo.file.name}`;
      this.storageRef = this.afs.ref(basePath);
      this.uploadTask = this.afs.upload(
        basePath, fileInfo.file, {contentType: fileInfo.file.type});

      const percentage$ = this.uploadTask.percentageChanges();
      totalPercentage.push(percentage$);

      // push each upload into array
      this.uploads.push({
        name: fileInfo.name,
        percentage: percentage$
      });

      this.uploadTask.then(snapshot => {
        return snapshot.ref.getDownloadURL().then(url => {
          return this.af.collection('filesinfo').add({
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
              this.af.doc(`${fileInfo.modelType}/${model.id}`).update(model);
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
  addImageInfo(imageInfo: ImageInfo) {
    this.af.collection('filesinfo').add(imageInfo);
  }
}
