import {TestBed, async} from '@angular/core/testing';
import {MessageService} from '../message.service';
import {MessagesComponent} from './messages.component';

describe('MessagesComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MessagesComponent]
        });
    });
    it('should create the app', () => {
       const fixture = TestBed.createComponent(MessagesComponent);
       const app = fixture.debugElement.componentInstance;
       expect(app).toBeTruthy();
    });
    it('should empty the message array the message service clear function ', () => {
        const fixture = TestBed.createComponent(MessagesComponent);
        const messageService = fixture.debugElement.injector.get(MessageService);
        fixture.detectChanges();
        expect(messageService.clear()).toBeUndefined();
    });
});
