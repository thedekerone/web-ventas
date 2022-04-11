import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLocalidadesComponent } from './select-localidades.component';

describe('SelectLocalidadesComponent', () => {
  let component: SelectLocalidadesComponent;
  let fixture: ComponentFixture<SelectLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLocalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
