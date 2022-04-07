import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from './Routes';

function NotFound() {
  return (
    <>
      <div>404 Not Found</div>
      <Link to={RoutePath.home}>Go To Home</Link>
    </>
  );
}

export default NotFound;
