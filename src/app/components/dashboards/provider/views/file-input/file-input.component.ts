import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FileInfo } from '../../../../../helpers';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Output() public filesInfo = new EventEmitter<FileInfo []>();
  @ViewChild('alert') alert: ElementRef;
  selectedFiles: FileInfo [] = [];
  showError = false;
  fileName = '';
  errorMsg = '';
  extensionError = false;
  sizeError = false;
  maxAllowed = false;

  constructor() { }

  ngOnInit() {
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.showError = false;
    this.extensionError = false;
    this.sizeError = false;
    this.maxAllowed = false;
    this.fileName = '';
  }

  onSelectFile(event) {
    // multiple files
    for (const file of event.target.files) {
      const reader = new FileReader();

      // validate max number of image allowed
      if (this.selectedFiles.length + event.target.files.length > 5) {
        this.showError = true;
        this.maxAllowed = true;

        return;
      }

      // validate image extension
      if (!this.isImageExtension(file.name)) {
        this.showError = true;
        this.extensionError = true;
        this.fileName = file.name;

        return;
      }

      // validate image size
      if (!this.isValidImageSize(file.size)) {
        this.showError = true;
        this.sizeError = true;
        this.fileName = file.name;

        return;
      }

      reader.addEventListener('load', (eventProgress: any) => {
        const index = this.selectedFiles.findIndex(f => f.file.name === file.name);
        if (index === -1) {
          const fileInfo = new FileInfo(eventProgress.target.result, file);
          fileInfo.pending = true;
          this.selectedFiles.push(fileInfo);
        }
      });

      reader.readAsDataURL(file);
    }

    // event send fileInfo data
    this.filesInfo.emit(this.selectedFiles);
  }

  markAsPrincipal(image: FileInfo) {
    // find image marked as principal
    this.selectedFiles.forEach(fileInfo => {
      if (fileInfo.markAsPrincipal) {
        fileInfo.markAsPrincipal = false;
        return;
      }
    });

    // mark as principal new image
    const fileInfoNew = this.selectedFiles.find(f => f.file.name === image.file.name);
    fileInfoNew.markAsPrincipal = true;
  }

  removeImage(image: FileInfo) {
    const index = this.selectedFiles.findIndex(f => f.file.name === image.file.name);
    const fileInfoRemoved = this.selectedFiles.splice(index, 1)[0];

    // select default element as principal
    // if the deleted item was marked as principal
    if (this.selectedFiles.length > 0 && fileInfoRemoved.markAsPrincipal) {
      index > 0
      ? this.selectedFiles[index - 1].markAsPrincipal = true
      : this.selectedFiles[index].markAsPrincipal = true;
    }
  }

  // valid image extension "jpg", "jpeg", "gif", "png"
  isImageExtension(fileName: string) {
    const regex = new RegExp('(.*?)\.(jpg|jpeg|gif|png)$');

    return regex.test(fileName);
  }

  // file size > 2048 kb
  isValidImageSize(size: number) {
    return (size / 1024) <= 2048;
  }
}
