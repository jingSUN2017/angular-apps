import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {InMemoryDataService} from './in-memory-data.service';

describe('InMemoryDataService', () => {
    let service: InMemoryDataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [InMemoryDataService],
        });

        service = TestBed.get(InMemoryDataService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should include totally 10 heroes in the DB', () => {
        expect(service.createDb().heroes.length).toEqual(10);
    });

    it('should include defined heroes in the DB', () => {
        expect(service.createDb()).not.toBeUndefined();
    });

    it('should include defined heroes in the DB', () => {
        expect(service.createDb()).toEqual({'heroes': [{ id: 11, name: 'Mr. Nice' },
                { id: 12, name: 'Narco' },
                { id: 13, name: 'Bombasto' },
                { id: 14, name: 'Celeritas' },
                { id: 15, name: 'Magneta' },
                { id: 16, name: 'RubberMan' },
                { id: 17, name: 'Dynama' },
                { id: 18, name: 'Dr IQ' },
                { id: 19, name: 'Magma' },
                { id: 20, name: 'Tornado' }]});
    });

    it('should include totally 10 hero in the DB', () => {
        expect(service.genId([{ 'id': 21, 'name': 'Mr. Nice' }])).toBeDefined();
    });
});
