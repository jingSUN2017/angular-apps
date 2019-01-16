import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService} from './message.service';

describe('HeroService', () => {
    let injector: TestBed;
    let service: HeroService;
    let serviceMsg: MessageService;
    let httpMock: HttpTestingController;

    /* before each test is run we're creating a new module with a test bed and we are providing the certain service to this class */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService, MessageService]
        });
        injector = getTestBed();
        /* it gives us an injected version of that service which we can then use throughout the project */
        service = injector.get(HeroService);
        serviceMsg = injector.get(MessageService);
        /* fire a request */
        httpMock = injector.get(HttpTestingController);
    });

    /* make sure that there are no outstanding requests/http calls */
    afterEach(() => {
        httpMock.verify();
    });

    describe('#getHeros', () => {
        it('should return a list of Observable<Hero[]>', () => {
            /* make some dummy posts which we can expect to get from API */
            const dummyHeros = [
                { id: 22, name: 'sally' },
                { id: 23, name: 'wowo'}
            ];

            service.getHeroes().subscribe(users => {
                expect(users.length).toBe(2);
                expect(users).not.toEqual(dummyHeros);
            });

            /* point our http client at the service.heroesUrl,determining whether our URL was correct */
            /* checking whether we are retrieving data from API */
            const req = httpMock.expectOne(`${service.heroesUrl}`);
            /* determine whether request method was also correct */
            expect(req.request.method).toBe('GET');
            /* allow us to use this dummy data and allows us to fire off that HTTP requests */
            req.flush(dummyHeros);
        });
    });

    describe('#getHero', () => {
        it('should return an Observable<Hero>', () => {
            const dummyHero = { id: 11, name: 'Mr. Nice' };

            service.getHero(dummyHero.id).subscribe(user => {
                expect(user.name).toEqual('Mr. Nice');
            });
            const req = httpMock.expectOne(`${service.heroesUrl}/${dummyHero.id}`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyHero);
        });
    });

    describe('#search', () => {
        const dummyParams_1 = '';
        const dummyParams_2 = { id: 11, name: 'Mr. Nice' };

        it('should search and return the result', () => {
            const searchedTerm = '';
            service.searchHeroes(searchedTerm).subscribe(term => {
                expect(term).toBeDefined();
            });
        });
        it('should throw an error if trying to search for not supported `what`', () => {
            service.searchHeroes(dummyParams_1)
                .subscribe(() => {}, err => {
                    expect(err).toBeDefined();
                });

            httpMock.expectNone(`${service.heroesUrl}/?name=${dummyParams_1}`);
        });

        it('should return an Observable<Hero>', () => {
            service.searchHeroes(dummyParams_2.name)
                .subscribe(result => {
                    expect(result.toString()).toBe(dummyParams_2);
                });

            const req = httpMock.expectOne(`${service.heroesUrl}/?name=${dummyParams_2.name}`);
            expect(req.request.url).toBe(`${service.heroesUrl}/?name=${dummyParams_2.name}`);

            req.flush([
                dummyParams_1,
                dummyParams_2
            ]);
        });
    });

    describe('#add', () => {
        const dummyHero = { id: 25, name: 'Miss. Nice' };
        it('should add an Observable<Hero>', () => {
            service.addHero(dummyHero)
                .subscribe(result => {
                    expect(result.toString()).toBe(dummyHero);
                });

            const req = httpMock.expectOne(`${service.heroesUrl}`);
            expect(req.request.method).toBe('POST');

            req.flush(dummyHero);
        });
    });

    describe('#delete', () => {
        const dummyHero = { id: 11, name: 'Mr. Nice'};
        it('should delete an Observable<Hero>', () => {
            service.deleteHero(dummyHero)
                .subscribe(result => {
                    expect(result.toString()).not.toContain(dummyHero);
                });

            const req = httpMock.expectOne(`${service.heroesUrl}/${dummyHero.id}`);
            expect(req.request.method).toBe('DELETE');

            req.flush(dummyHero);
        });
    });

    describe('#update', () => {
        const dummyHero = { id: 11, name: 'Mr. Excellent'};
        it('should update an Observable<Hero>', () => {
            service.updateHero(dummyHero)
                .subscribe(result => {
                    expect(result.toString()).toBe(dummyHero);
                });

            const req = httpMock.expectOne(`${service.heroesUrl}`);
            expect(req.request.method).toBe('PUT');

            req.flush(dummyHero);
        });
    });
});






