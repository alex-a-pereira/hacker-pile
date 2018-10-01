import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-files-create",
  templateUrl: "./files-create.component.html",
  styleUrls: ["./files-create.component.scss"]
})
export class FilesCreateComponent implements OnInit {
  @ViewChild("createFileForm")
  form: NgForm;

  createFileFailed: Boolean = false;

  constructor() {}

  ngOnInit() {
    
  }

}
