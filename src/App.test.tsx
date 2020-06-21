import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

const appComponent = renderer.create(<App />);
test('Homepage render', () => {
  let tree = appComponent.toJSON();
  expect(tree).toMatchSnapshot();
});
