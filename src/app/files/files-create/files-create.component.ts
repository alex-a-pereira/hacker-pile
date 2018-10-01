import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-files-create",
  templateUrl: "./files-create.component.html",
  styleUrls: ["./files-create.component.scss"]
})
export class FilesCreateComponent implements OnInit {
  @ViewChild("compareForm")
  form: NgForm;

  createFileFailed: Boolean = false;

  constructor() {}

  ngOnInit() {
    // this.fileService.deleteFileFailed.subscribe(
    //   (didFail: boolean) => (this.createFileFailed = didFail)
    // );
  }

//   onSubmit() {
//     const data: FileData = {
//       fileName: this.form.value.name as string,
//       fileLanguage: this.form.value.language as string,
//       fileNotes: this.form.value.notes as string
//     };
//     this.fileService.onCreateFileSubmit(data);
//   }

//   onFetchStoredData() {
//     this.fileService.onRetrieveFileDirectory();
//   }
}
