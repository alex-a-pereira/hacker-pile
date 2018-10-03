import { Component, OnInit, OnDestroy } from "@angular/core";

import { FilesService } from "./files.service";
import { FileData, DirectoryFile } from "./files.model";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {
  directoryFiles: DirectoryFile[] = [];
  currentFile: FileData;

  viewingCreateFile = false;
  viewingDeleteFile = false;

  fileDirectoryLoading;
  mainLoading;

  fileDirectoryDidFail = false;
  selectedFileDidFail = false;

  // array of subscriptions to be unsubscribed upon component destroy
  subcriptions = [];
  // Tag for determining active list-group-item
  selectedTag: string = "";

  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.filesService.onRetrieveFileDirectory();
    // Listen to createFile and deleteFile so filesService can
    // return back to FilesMain once operation is complete
    var creatingFileSub = this.filesService.creatingFile.subscribe(
      (status: boolean) => {
        this.viewingCreateFile = status;
      }
    );
    var deletingFileSub = this.filesService.deletingFile.subscribe(
      (status: boolean) => {
        this.viewingDeleteFile = status;
      }
    );

    var directoryLoadingSub = this.filesService.directoryIsLoading.subscribe(
      (status: boolean) => {
        this.fileDirectoryLoading = status;
      }
    );
    // Listen for directory files list and if the FileDirectory is loading from API
    var directorySub = this.filesService.directoryFiles.subscribe(
      (filesList: DirectoryFile[]) => {
        console.log("data loaded", filesList);
        this.directoryFiles = filesList;
      }
    );
    var directoryFailedSub = this.filesService.directoryLoadFailed.subscribe(
      (didFail: boolean) => (this.fileDirectoryDidFail = didFail)
    );

    // Listen for selected file change and if the file is loading from API
    var mainLoadingSub = this.filesService.mainIsLoading.subscribe(
      (status: boolean) => {
        this.mainLoading = status;
      }
    );

    var selectedFileSub = this.filesService.selectedFile.subscribe(
      (file: FileData) => {
        this.currentFile = file;
        this.selectedTag = file.FileId;
      }
    );

    var selectedFileFailSub = this.filesService.selectedFileLoadFailed.subscribe(
      (didFail: boolean) => (this.selectedFileDidFail = didFail)
    );

    this.subcriptions.push(
      creatingFileSub,
      deletingFileSub,
      directorySub,
      directoryFailedSub,
      selectedFileSub,
      selectedFileFailSub,
      mainLoadingSub,
      directoryLoadingSub
    );
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
