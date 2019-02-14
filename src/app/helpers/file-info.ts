export class FileInfo {
  name: string;
  createdAt: Date = new Date();
  markAsPrincipal = false;
  size: number;
  type: string;
  modelType: string;
  modelId?: string;
  url?: string;

  constructor(public src: string, public file: File) {
    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
  }
}
