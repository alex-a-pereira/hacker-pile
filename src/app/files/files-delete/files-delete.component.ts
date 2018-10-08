import { Component, OnInit } from "@angular/core";

import { FilesService } from "../files.service";
import { FileData } from "../files.model";

@Component({
  selector: "app-files-delete",
  templateUrl: "./files-delete.component.html",
  styleUrls: ["./files-delete.component.scss"]
})
export class FilesDeleteComponent implements OnInit {
  fileToDelete: FileData;
  deleteFileFailed: Boolean = false;

  constructor(private fileService: FilesService) {}

  ngOnInit() {
    this.fileService.selectedFile.subscribe((file: FileData) => {
      this.fileToDelete = file;
      console.log(file);
      console.log(file.FileId);
    });

    this.fileService.deleteFileFailed.subscribe(
      (didFail: boolean) => (this.deleteFileFailed = didFail)
    );
  }

  onSubmit() {
    const deleteFileId: string = this.fileToDelete.FileId;
    console.log("delete file", deleteFileId);
    this.fileService.onDeleteFileSubmit(deleteFileId);
  }
}
