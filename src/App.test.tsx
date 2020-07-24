import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('Dummy Suite', () => {
  it('Dummy test', (done) => {
    expect(1 === 1).toEqual(true);
    done();
  });
});
