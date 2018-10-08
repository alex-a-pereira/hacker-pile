export interface FileData {
  FileName: string;
  FileNotes: string;
  FileContent: string;
  FileId: string;
}

export interface DirectoryFile {
  FileName: string;
  FileId: string;
}

export interface NewFile {
  fileName: string;
  fileNotes: string;
}
