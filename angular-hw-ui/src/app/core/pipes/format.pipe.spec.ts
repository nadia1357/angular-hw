import { FormatPipe } from './format.pipe';

describe('FormatPipe', () => {
  const pipe = new FormatPipe();
  it('transforms `abc` to `:( abc ):`', () => {
    expect(pipe.transform('abc')).toBe(':( abc ):');
  });
});
