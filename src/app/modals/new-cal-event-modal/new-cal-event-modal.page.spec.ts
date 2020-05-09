import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCalEventModalPage } from './new-cal-event-modal.page';

describe('NewCalEventModalPage', () => {
  let component: NewCalEventModalPage;
  let fixture: ComponentFixture<NewCalEventModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCalEventModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCalEventModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
