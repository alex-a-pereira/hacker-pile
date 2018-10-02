import { Component, OnInit } from '@angular/core';

const defaults = {
  python:
    'print(\"hello world!\")',
};

@Component({
  selector: 'app-files-main',
  templateUrl: './files-main.component.html',
  styleUrls: ['./files-main.component.scss']
})
export class FilesMainComponent implements OnInit {
  readOnly = false;

  selectedFile;

  codeboxValue = 'print("hello world!")';
  notesValue = "Cool notes about your file go here";

  codeboxOptions: any = {
    lineNumbers: true,
    mode: 'python',
    theme: 'neo'
  };

  constructor(private fileService: FilesService) {}

  ngOnInit() {
    this.fileService.selectedFile.subscribe((newFile: FileData) => {
      this.selectedFile = newFile;
      this.codeboxValue = newFile.FileContent;
      this.notesValue = newFile.FileNotes;
    });
  }

  saveFile() {
    if (
      this.codeboxValue == this.selectedFile.FileContent &&
      this.notesValue == this.selectedFile.FileNotes
    ) {
      return;
    } else {
      const dataToUpdateWith: FileData = {
        ...this.selectedFile,
        FileNotes: escape(this.notesValue),
        FileContent: escape(this.codeboxValue)
      };
      console.log(dataToUpdateWith);
      this.fileService.onUpdateFile(dataToUpdateWith);
    }
  }

  handleCodeChange($event) {
    this.codeboxValue = $event;
  }

  handleNotesChange($event) {
    this.notesValue = $event;
  }
}
