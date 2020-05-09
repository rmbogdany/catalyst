import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewNoteModalPage } from './new-note-modal.page';

describe('NewNoteModalPage', () => {
  let component: NewNoteModalPage;
  let fixture: ComponentFixture<NewNoteModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNoteModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewNoteModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
