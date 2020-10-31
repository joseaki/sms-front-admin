import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import MainUserView from 'views/users';
import AddUSer from 'views/users/addUser';
import SearchUser from 'views/users/searchUser';
import UsersTable from 'views/users/usersTable';

let wrapped: ShallowWrapper;

beforeEach(() => {
  wrapped = shallow(<MainUserView />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a searchbar a button to create new users and a table to show data', () => {
  expect(wrapped.find(SearchUser).length).toEqual(1);
  expect(wrapped.find(AddUSer).length).toEqual(1);
  expect(wrapped.find(UsersTable).length).toEqual(1);
});
