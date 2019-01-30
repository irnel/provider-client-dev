import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileInfo } from '../../../../../helpers';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Output() public filesInfo = new EventEmitter<FileInfo []>();
  selectedFiles: FileInfo [] = [];

  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (eventProgress: any) => {
      const index = this.selectedFiles.findIndex(f => f.file.name === file.name);
      if (index === -1) {
        const fileInfo = new FileInfo(eventProgress.target.result, file);
        fileInfo.pending = true;
        this.selectedFiles.push(fileInfo);

        // event send fileInfo data
        this.filesInfo.emit(this.selectedFiles);
      }
    });

    reader.readAsDataURL(file);
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

    // select the previous one as principal
    // if the deleted item was marked as principal
    if (this.selectedFiles.length > 0 && fileInfoRemoved.markAsPrincipal) {
      this.selectedFiles[index - 1].markAsPrincipal = true;
    }
  }
}
