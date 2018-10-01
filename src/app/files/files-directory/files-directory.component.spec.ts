import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDirectoryComponent } from './files-directory.component';

describe('FilesDirectoryComponent', () => {
  let component: FilesDirectoryComponent;
  let fixture: ComponentFixture<FilesDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
