import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FileInfo } from '../../../../../helpers';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Output() public filesInfo = new EventEmitter<FileInfo []>();
  @Input() onProgress: Observable<number>;
  @Input() uploading: Boolean;
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
      if (!this.isValidExtension(file.type)) {
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
          this.selectedFiles.push(fileInfo);
        }

        // event send fileInfo data
        this.filesInfo.emit(this.selectedFiles);
      });

      reader.readAsDataURL(file);
    }
  }

  markAsPrincipal(image: FileInfo) {
    // find image marked as principal
    this.selectedFiles.map(f => f.markAsPrincipal = false);

    // mark as principal new image
    const index = this.selectedFiles.findIndex(f => f.file.name === image.file.name);
    this.selectedFiles[index].markAsPrincipal = true;

    // event send fileInfo data
    this.filesInfo.emit(this.selectedFiles);
  }

  removeImage(image: FileInfo) {
    const index = this.selectedFiles.findIndex(f => f.file.name === image.file.name);
    this.selectedFiles.splice(index, 1);

    // event send fileInfo data
    this.filesInfo.emit(this.selectedFiles);
  }

  // valid image extension "jpg", "jpeg", "gif", "png"
  isValidExtension(type: string) {
    return type.split('/')[0] === 'image';
  }

  // file size > 2048 kb
  isValidImageSize(size: number) {
    return (size / 1024) <= 2048;
  }
}
