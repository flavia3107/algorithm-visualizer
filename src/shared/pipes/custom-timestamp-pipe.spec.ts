import { CustomTimestampPipe } from './custom-timestamp-pipe';

describe('CustomTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
