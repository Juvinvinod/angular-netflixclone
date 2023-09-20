import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowlistComponent } from './showlist.component';

describe('ShowlistComponent', () => {
  let component: ShowlistComponent;
  let fixture: ComponentFixture<ShowlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowlistComponent]
    });
    fixture = TestBed.createComponent(ShowlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
