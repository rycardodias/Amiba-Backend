import Router from 'next/router';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { logout } from './lib/requests';

function routeToItem() {
  Router.push({
    pathname: '/',
  });
}
const Signout = (props) => (
  <Nav.Link
    type="button"
    onClick={() => {
      logout();
      props.refetch();
      routeToItem();
    }}
  >
    Signout
  </Nav.Link>
);
export default Signout;