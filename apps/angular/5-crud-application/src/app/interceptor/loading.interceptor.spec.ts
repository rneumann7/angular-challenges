import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from '../service/loading.service';
import { loadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingService: LoadingService;
  const testUrl = '/test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        LoadingService,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set loading to true on request and false on response', () => {
    // Arrange
    let loading = false;
    loadingService.loading$.subscribe((isLoading) => (loading = isLoading));
    expect(loading).toBe(false);

    // Act
    httpClient.get(testUrl).subscribe();

    // Assert
    expect(loading).toBe(true);
    const req = httpMock.expectOne(testUrl);
    req.flush({});
    expect(loading).toBe(false);
  });

  it('should set loading to false on error response', () => {
    // Arrange
    let loading = false;
    loadingService.loading$.subscribe((isLoading) => (loading = isLoading));
    expect(loading).toBe(false);

    // Act
    httpClient.get(testUrl).subscribe(
      () => {},
      () => {},
    );

    // Assert
    expect(loading).toBe(true);
    const req = httpMock.expectOne(testUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    expect(loading).toBe(false);
  });
});
