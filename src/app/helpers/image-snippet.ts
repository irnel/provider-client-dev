export class ImageSnippet {
  status = 'init';
  pending = false;
  markAsPrincipal = false;

  constructor(public src: string, public file: File) {}
}
