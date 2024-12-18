import { TestBed } from '@angular/core/testing';

import { ApiConfigService } from './api-config.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiConfigService', () => {
  let service: ApiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(ApiConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
