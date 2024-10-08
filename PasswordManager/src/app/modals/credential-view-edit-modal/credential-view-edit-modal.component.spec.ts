import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialViewEditModalComponent } from './credential-view-edit-modal.component';

describe('CredentialViewEditModalComponent', () => {
  let component: CredentialViewEditModalComponent;
  let fixture: ComponentFixture<CredentialViewEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialViewEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialViewEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
