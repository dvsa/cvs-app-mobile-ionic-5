import { FormatBooleanPipe } from './format-boolean.pipe';

describe('FormatBooleanPipe', () => {
  const pipe = new FormatBooleanPipe();

  it('should convert boolean to string', () => {
    let inputValue = true;
    let converted = pipe.transform(inputValue);
    expect(converted).toMatch('Yes');
    inputValue = false;
    converted = pipe.transform(inputValue);
    expect(converted).toMatch('No');
  });
});
