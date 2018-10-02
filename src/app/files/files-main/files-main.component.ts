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

  codeboxValue = 'print("hello world!")';

  codeboxOptions: any = {
    lineNumbers: true,
    mode: "python",
    theme: "neo"
  };

  constructor(private filesService: FilesService) {}

  ngOnInit() {}

  handleChange($event) {
    console.log($event);
  }
}
