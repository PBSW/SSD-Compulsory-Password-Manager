import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialCreateModalComponent } from './credential-create-modal.component';

describe('CredentialCreateModalComponent', () => {
  let component: CredentialCreateModalComponent;
  let fixture: ComponentFixture<CredentialCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
