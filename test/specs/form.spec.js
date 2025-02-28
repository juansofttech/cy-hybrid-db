import { generateFakeData } from './fakeData';

describe('Login Feature', function () {
  it('should allow valid users to login', function () {
    const fakeData = generateFakeData();
    browser.get('https://example.com/login');
    element(by.model('username')).sendKeys(fakeData.username);
    element(by.model('password')).sendKeys(fakeData.password);
    element(by.css('button[type="submit"]')).click();
    expect(browser.getTitle()).toBe('Dashboard');
  });
});

describe('Form Submission', function () {
  it('should submit form data', function () {
    const fakeData = generateFakeData();
    browser.get('https://example.com/form');
    element(by.model('name')).sendKeys(fakeData.name);
    element(by.model('email')).sendKeys(fakeData.email);
    element(by.css('button[type="submit"]')).click();
    expect(browser.getTitle()).toBe('Form Submitted');
  });
});

describe('Search Functionality', function () {
  it('should display search results', function () {
    const fakeData = generateFakeData();
    browser.get('https://example.com/search');
    element(by.model('searchQuery')).sendKeys(fakeData.searchQuery);
    element(by.css('button[type="submit"]')).click();
    expect(element.all(by.repeater('result in results')).count()).toBeGreaterThan(0);
  });
});