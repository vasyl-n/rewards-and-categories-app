import React from 'react';
import { RewardsAndCategories } from './components/RewardsAndCategories';
import { shallow } from 'enzyme';

const TITLE = 'Rewards and Categories';

describe('Rewards and Categories', () => {
  it('should render the Rewards component correctly', () => {   
    const warapper = shallow(<RewardsAndCategories />)
    expect(wrapped).toMatchSnapshot();
  });
  it('renders the Title correctly', () => { 
    expect(wrapped.find('h1').text()).toEqual(title);
  });
});
