import { NotificationService } from './../notification/notification.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { FileInfo, DataTransfer } from '../../helpers';
import { ImageInfo } from './../../models';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  downloadUrl: Observable<string>;

  storageRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly firestore: AngularFirestore,
    private readonly notification: NotificationService
    ) { }

  upload(fileInfo: FileInfo, progress: { percentage: number }) {
    const basePath = `${fileInfo.type}/${fileInfo.createdAt.getTime()}_${fileInfo.file.name}`;
    this.storageRef = this.storage.ref(basePath);
    this.uploadTask = this.storage.upload(
      basePath, fileInfo.file, {contentType: fileInfo.file.type});

    this.uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage  = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail upload
        this.notification.ErrorMessage(error.message, '', 2500);
      },
      () => {
        // complete upload
        this.uploadTask.snapshotChanges().pipe(
          finalize(() => {
            this.downloadUrl = this.storageRef.getDownloadURL();
            this.downloadUrl.subscribe(imageUrl => {
              const imageInfo: ImageInfo = {
                name: fileInfo.name,
                size: fileInfo.size,
                type: fileInfo.type,
                modelType: fileInfo.modelType,
                modelId: fileInfo.modelId,
                url: imageUrl,
                createdAt: fileInfo.createdAt,
                markAsPrincipal: fileInfo.markAsPrincipal
              };

              this.addImageInfo(imageInfo);
            });
          })
        ).subscribe();
      });
  }

  // add document to images collection
  addImageInfo(imageInfo: ImageInfo) {
    this.firestore.collection<ImageInfo>('filesinfo').add(imageInfo);
  }
}
