import { Component, OnInit } from "@angular/core";

import { FilesService } from "../files.service";
import { FileData } from "../files.model";

@Component({
  selector: "app-files-main",
  templateUrl: "./files-main.component.html",
  styleUrls: ["./files-main.component.scss"]
})
export class FilesMainComponent implements OnInit {
  readOnly = false;

  selectedFile;

  codeboxValue = 'print("hello world!")';
  notesValue = "Cool notes about your file go here";

  isChanged = false;
  isLoadingUpdate = false;
  updateFailure = false;

  codeboxOptions: any = {
    lineNumbers: true,
    mode: "python",
    theme: "neo"
  };

  constructor(private fileService: FilesService) {}

  ngOnInit() {
    this.fileService.selectedFile.subscribe((newFile: FileData) => {
      this.selectedFile = newFile;
      this.codeboxValue = newFile.FileContent;
      this.notesValue = newFile.FileNotes;
    });

    this.fileService.updateFileFailed.subscribe((status: boolean) => {
      console.log("status!!!", status);
      if (status === true) {
        this.isChanged = true;
        this.updateFailure = false;
      } else {
        this.updateFailure = false;
        this.isChanged = false;
      }
    });

    this.fileService.updatingFile.subscribe((status: boolean) => {
      this.isLoadingUpdate = status;
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
        FileNotes: this.notesValue,
        FileContent: this.codeboxValue
      };
      console.log(dataToUpdateWith);
      this.fileService.onUpdateFile(dataToUpdateWith);
    }
  }

  handleCodeChange($event) {
    this.codeboxValue = $event;
    this.isChanged = true;
    console.log("is changed");
  }

  handleNotesChange($event) {
    this.notesValue = $event;
  }
}
