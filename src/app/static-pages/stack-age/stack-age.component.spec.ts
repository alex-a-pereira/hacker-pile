import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackAgeComponent } from './stack-age.component';

describe('StackAgeComponent', () => {
  let component: StackAgeComponent;
  let fixture: ComponentFixture<StackAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
