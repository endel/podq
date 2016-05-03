/* eslint-disable no-unused-vars */

jest.unmock('../Cover.jsx');
jest.unmock('../../tools/tools');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';

import Cover from '../Cover.jsx';

describe('<Cover />', () => {

  it('should render the podcast title when no image provided', () => {

    const cover = shallow(
      <Cover alt="Some Title" />
    );

    const alt = cover.text();

    expect(alt).toBe('Some Title');
  });

  it('should limit the title length to 60 characteres', () => {

    const cover = shallow(
      <Cover alt="Elit minus laudantium doloribus aspernatur nemo natus quis nulla error necessitatibus minima! Architecto at consectetur quasi ut blanditiis facilis itaque rerum repellendus corporis necessitatibus quae ut quo, numquam. Modi doloribus" />
    );

    const alt = cover.text();

    expect(alt.length).toBeLessThan(64);
    expect(alt.slice(-3)).toBe('...');
  });

  it('should not render the podcast title when a image is provided', () => {

    const cover = shallow(
      <Cover alt="Some Title" src="someFakeImage.jpg" />
    );

    const alt = cover.text();

    expect(alt).toBe('');
  });

  it('should render a image when a prop.src is provided', () => {

    const cover = shallow(
      <Cover alt="Some Title" src="someFakeImage.jpg" />
    );

    const imgNode = cover.find('img');
    console.log();
    expect(imgNode).toBeDefined();
    expect(imgNode.prop('src')).toBe('someFakeImage.jpg');
    expect(imgNode.prop('alt')).toBe('Some Title');
  });
});
