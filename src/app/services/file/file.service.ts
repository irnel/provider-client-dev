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

@Injectable({
  providedIn: 'root'
})
export class FileService {
  storageRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly firestore: AngularFirestore,
    private readonly notification: NotificationService
    ) { }

  upload(fileInfo: FileInfo, progress: { percentage: number }, cant: number) {
    const basePath = `${fileInfo.type}/${fileInfo.createdAt.getTime()}_${fileInfo.file.name}`;
    this.storageRef = this.storage.ref(basePath);
    this.uploadTask = this.storage.upload(
      basePath, fileInfo.file, {contentType: fileInfo.file.type});

    this.uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage  = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        console.log(progress.percentage);
        if (snap.bytesTransferred === snap.totalBytes) {
          cant++;
          console.log(cant);
        }
      },
      (error) => {
        // fail upload
        console.log(error);
        this.notification.ErrorMessage(error.message, '', 2500);
      },
      () => {
        // complete upload
        this.uploadTask.task.snapshot.ref.getDownloadURL().then(downloadUrl => {
          fileInfo.url = downloadUrl;

          const imageInfo: ImageInfo = {
            createdAt: fileInfo.createdAt,
            markAsPrincipal: fileInfo.markAsPrincipal,
            modelId: fileInfo.modelId,
            type: fileInfo.type,
            url: fileInfo.url
          };

          this.addImageInfo(imageInfo);
        });
      });
  }

  // add document to images collection
  addImageInfo(imageInfo: ImageInfo) {
    this.firestore.collection('filesinfo').add(imageInfo);
  }
}
