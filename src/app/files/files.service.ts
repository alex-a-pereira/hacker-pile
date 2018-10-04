import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";

const nullFile = {
  FileName: null,
  FileNotes: null,
  FileContent: null,
  FileId: null
};

// auth
import { UserAuthService } from "../user-auth/user-auth.service";
// models
import { FileData, DirectoryFile, NewFile } from "./files.model";

@Injectable({
  providedIn: "root"
})
export class FilesService {
  directoryFiles = new Subject<DirectoryFile[]>();
  selectedFile = new BehaviorSubject<FileData>(nullFile);

  selectedFileLoadFailed = new Subject<boolean>();
  directoryLoadFailed = new Subject<boolean>();

  creatingFile = new Subject<boolean>();
  createFileFailed = new Subject<boolean>();

  deletingFile = new Subject<boolean>();
  deleteFileFailed = new Subject<boolean>();

  updatingFile = new Subject<boolean>();
  updateFileFailed = new Subject<boolean>();

  directoryIsLoading = new BehaviorSubject<boolean>(false);
  mainIsLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: Http, private authService: UserAuthService) {}

  onRetrieveFileDirectory(selectIdx = -999) {
    this.directoryLoadFailed.next(false);
    this.directoryIsLoading.next(true);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        this.directoryIsLoading.next(false);
        this.directoryLoadFailed.next(true);
        console.log(err);
        return;
      }
      this.http
        .get(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files",
          {
            headers: new Headers({
              Authorization: session.getIdToken().getJwtToken()
            })
          }
        )
        .map((response: Response) => response.json())
        .subscribe(
          receivedFiles => {
            if (receivedFiles) {
              this.directoryIsLoading.next(false);
              this.directoryFiles.next(receivedFiles);
              if (selectIdx >= 0) {
                this.onSelectFile(receivedFiles[selectIdx].FileId);
              }
            } else {
              this.directoryIsLoading.next(false);
              this.directoryLoadFailed.next(true);
            }
          },
          error => {
            console.log(error);
            this.directoryIsLoading.next(false);
            this.directoryLoadFailed.next(true);
            this.directoryFiles.next(null);
          }
        );
    });
  }

  onSelectFile(fileId: string) {
    this.creatingFile.next(false);
    this.deletingFile.next(false);
    this.mainIsLoading.next(true);

    this.selectedFileLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        this.selectedFile.next(null);
        this.mainIsLoading.next(false);
        return;
      }
      this.http
        .get(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files/" +
            fileId,
          {
            headers: new Headers({
              Authorization: session.getIdToken().getJwtToken()
            })
          }
        )
        .map((response: Response) => response.json())
        .subscribe(
          file => {
            if (file) {
              this.selectedFile.next(file);
              this.mainIsLoading.next(false);
            } else {
              this.selectedFileLoadFailed.next(true);
              this.mainIsLoading.next(false);
            }
          },
          error => {
            this.selectedFileLoadFailed.next(true);
            this.directoryFiles.next(null);
            this.mainIsLoading.next(false);
          }
        );
    });
  }

  onDeleteFileSubmit(fileId: string) {
    this.deleteFileFailed.next(false);
    this.mainIsLoading.next(true);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        this.mainIsLoading.next(false);
        console.log(err);
        return;
      }
      this.http
        .delete(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files/" +
            fileId,
          {
            headers: new Headers({
              Authorization: session.getIdToken().getJwtToken()
            })
          }
        )
        .map((response: Response) => response.json())
        .subscribe(
          deleteStatus => {
            if (deleteStatus) {
              this.onRetrieveFileDirectory(0);
              this.deletingFile.next(false);
              this.mainIsLoading.next(false);
            } else {
              this.deleteFileFailed.next(true);
              this.deletingFile.next(false);
              this.mainIsLoading.next(false);
            }
          },
          error => {
            this.deleteFileFailed.next(true);
            this.deletingFile.next(false);
            this.mainIsLoading.next(false);
          }
        );
    });
  }

  onCreateFileSubmit(data: NewFile) {
    this.selectedFileLoadFailed.next(false);
    this.mainIsLoading.next(true);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        this.mainIsLoading.next(false);
        return;
      }
      this.http
        .post(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files",
          data,
          {
            headers: new Headers({
              Authorization: session.getIdToken().getJwtToken()
            })
          }
        )
        .subscribe(
          result => {
            this.selectedFileLoadFailed.next(false);
            this.onSelectFile(result.json().newFileId);
            this.onRetrieveFileDirectory();
          },
          error => {
            this.selectedFileLoadFailed.next(true);
            console.log(error);
            this.mainIsLoading.next(false);
          }
        );
    });
  }

  onUpdateFile(data: FileData) {
    const fileId = data.FileId;
    this.updatingFile.next(true);

    const submission = {
      fileId: data.FileId,
      fileName: data.FileName,
      fileNotes: escape(data.FileNotes),
      fileContent: escape(data.FileContent)
    };

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        this.updatingFile.next(false);
        this.updateFileFailed.next(true);
        console.log(err);
        return;
      }
      this.http
        .put(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files/" +
            fileId,
          submission,
          {
            headers: new Headers({
              Authorization: session.getIdToken().getJwtToken()
            })
          }
        )
        .map((response: Response) => response.json())
        .subscribe(
          updateStatus => {
            if (updateStatus) {
              this.selectedFile.next(data);
              this.updatingFile.next(false);
              this.updateFileFailed.next(false);
            } else {
              this.updatingFile.next(false);
              this.updateFileFailed.next(true);
              console.log(updateStatus);
            }
          },
          error => {
            this.updatingFile.next(false);
            this.updateFileFailed.next(true);
            console.log(error);
          }
        );
    });
  }
}
