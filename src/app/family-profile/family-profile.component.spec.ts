import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileComponent } from './family-profile.component';

describe('FamilyProfileComponent', () => {
  let component: FamilyProfileComponent;
  let fixture: ComponentFixture<FamilyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
