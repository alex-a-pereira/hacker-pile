import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesMainComponent } from './files-main.component';

describe('FilesMainComponent', () => {
  let component: FilesMainComponent;
  let fixture: ComponentFixture<FilesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
