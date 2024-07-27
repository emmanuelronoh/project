const dateUtils = require('../../utils/dateUtils');

describe('Date Utils', () => {
  it('should format a date correctly', () => {
    const date = new Date('2024-01-01');
    const formattedDate = dateUtils.formatDate(date);

    expect(formattedDate).toBe('01-01-2024');
  });

  it('should parse a date string correctly', () => {
    const dateString = '01-01-2024';
    const parsedDate = dateUtils.parseDate(dateString);

    expect(parsedDate).toEqual(new Date('2024-01-01'));
  });
});
