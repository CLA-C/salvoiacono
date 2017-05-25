import { SalvoiaconoPage } from './app.po';

describe('salvoiacono App', () => {
  let page: SalvoiaconoPage;

  beforeEach(() => {
    page = new SalvoiaconoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
