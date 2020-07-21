import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCommentPage } from './post-comment.page';

describe('PostCommentPage', () => {
  let component: PostCommentPage;
  let fixture: ComponentFixture<PostCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
