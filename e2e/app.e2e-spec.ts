import { DemoProjectPage } from './app.po';

describe('demo-project App', () => {
  let page: DemoProjectPage;

  beforeEach(() => {
    page = new DemoProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
