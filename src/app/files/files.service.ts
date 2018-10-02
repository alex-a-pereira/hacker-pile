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
import { FileData, DirectoryFile, NewFile, UpdateFile } from "./files.model";

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

  // appState: AppState = AppState.VIEW;

  constructor(private http: Http, private authService: UserAuthService) {}

  onRetrieveFileDirectory(selectIdx = -999) {
    this.directoryLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
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
              this.directoryFiles.next(receivedFiles);
              if (selectIdx >= 0) {
                this.onSelectFile(receivedFiles[selectIdx].FileId);
              }
            } else {
              console.log("No files returned from API call");
              this.directoryLoadFailed.next(true);
            }
          },
          error => {
            console.log(error);
            this.directoryLoadFailed.next(true);
            this.directoryFiles.next(null);
          }
        );
    });
  }

  onSelectFile(fileId: string) {
    this.creatingFile.next(false);
    this.deletingFile.next(false);
    // this.selectedFile.next(null);
    this.selectedFileLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        this.selectedFile.next(null);
        console.log(err);
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
              console.log("good", file);
              this.selectedFile.next(file);
            } else {
              this.selectedFileLoadFailed.next(true);
            }
          },
          error => {
            this.selectedFileLoadFailed.next(true);
            this.directoryFiles.next(null);
          }
        );
    });
  }

  onDeleteFileSubmit(fileId: string) {
    this.deleteFileFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
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
              console.log("deleted", deleteStatus);
              this.onRetrieveFileDirectory(0);
              this.deletingFile.next(false);
            } else {
              this.deleteFileFailed.next(true);
              this.deletingFile.next(false);
            }
          },
          error => {
            this.deleteFileFailed.next(true);
            this.deletingFile.next(false);
          }
        );
    });
  }

  onCreateFileSubmit(data: NewFile) {
    this.selectedFileLoadFailed.next(false);
    // this.dataEdited.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
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
          }
        );
    });
  }

  onUpdateFile(data: UpdateFile) {
    const fileId = data.fileId;
    console.log(data);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      this.http
        .put(
          "https://adqe8hh6ni.execute-api.us-east-1.amazonaws.com/dev/files/" +
            fileId,
          data,
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
              console.log("updated", updateStatus);
            } else {
              console.log("update failed");
            }
          },
          error => {
            console.log("update failed", error);
          }
        );
    });
  }
}
