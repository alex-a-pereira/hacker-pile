  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcriptions.map(sub => {
      sub.unsubscribe();
    });
  }

  onSelectFile(fileId: string) {
    this.filesService.onSelectFile(fileId);
  }

  onCreateFile() {
    this.filesService.deletingFile.next(false);
    this.filesService.creatingFile.next(true);
  }

  onDeleteFile() {
    this.filesService.creatingFile.next(false);
    this.filesService.deletingFile.next(true);
  }

  getFileDirectoryClass(listItemTag: string) {
    if (listItemTag === this.selectedTag) {
      return "list-group-item-info";
    } else {
      return "";
    }
  }
}
