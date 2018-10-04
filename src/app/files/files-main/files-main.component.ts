import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
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

  autoSave = _.debounce(this.saveFile, 12000);

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
      this.isChanged = false;
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
    this.autoSave();
  }

  handleNotesChange($event) {
    this.notesValue = $event;
    this.isChanged = true;
    this.autoSave();
  }
}
