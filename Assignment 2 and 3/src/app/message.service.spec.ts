import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MessageService} from './message.service';

describe('MessageService', () => {
    let service: MessageService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MessageService],
        });

        service = TestBed.get(MessageService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add term into the message array', () => {
        service.add('testing with jest');
        expect(service.messages).toEqual(['testing with jest']);
    });

    it('should add terms into the message array', () => {
        service.add('testing A with jest');
        service.add('testing B with jest');
        expect(service.messages.length).toBe(2);
        expect(service.messages).toEqual(['testing A with jest', 'testing B with jest']);
    });
    it('should clear terms in the message array', () => {
        expect(service.clear()).toBeUndefined();
    });
});

