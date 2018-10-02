import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { FilesService } from "../files.service";
import { FileData, NewFile } from "../files.model";

@Component({
  selector: "app-files-create",
  templateUrl: "./files-create.component.html",
  styleUrls: ["./files-create.component.scss"]
})
export class FilesCreateComponent implements OnInit {
  @ViewChild("createFileForm")
  form: NgForm;

  createFileFailed: Boolean = false;

  constructor(private fileService: FilesService) {}

  ngOnInit() {
    this.fileService.deleteFileFailed.subscribe(
      (didFail: boolean) => (this.createFileFailed = didFail)
    );
  }

  onSubmit() {
    const data: NewFile = {
      fileName: this.form.value.name as string,
      fileNotes: this.form.value.notes as string
    };
    this.fileService.onCreateFileSubmit(data);
  }
}
