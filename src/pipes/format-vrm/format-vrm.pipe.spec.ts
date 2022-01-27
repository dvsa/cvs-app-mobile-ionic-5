import { FormatVrmPipe } from './format-vrm.pipe';

describe('FormatVrmPipe', () => {
  const pipe = new FormatVrmPipe();

  it('should place a space in a string after 4 characters', () => {
    let vrm = 'BQ91YHQ';
    let transformedVrm = pipe.transform(vrm);
    expect(transformedVrm).toMatch('BQ91 YHQ');
    vrm = 'BQ91';
    transformedVrm = pipe.transform(vrm);
    expect(transformedVrm).toMatch('BQ91');
  });
});
