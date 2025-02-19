import { EightyLevelService } from './80level-api.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I80levelResponseAllArticles } from '../../../models/vendors-api/80level/80level.model';

describe('EightyLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('getArticles method should return correct data structure', () => {
    const service = TestBed.get(EightyLevelService);
    service
      .getArticles(null)
      .subscribe(async (response: I80levelResponseAllArticles) => {
        const articles = response.articles;
        expect(articles).toContain('total');
        expect(articles).toContain('items');
      });
  });
});
