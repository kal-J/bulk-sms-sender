import React from 'react';
import NavBar from './NavBar';
import Footer from './footer/Footer';

const Layout = (props) => (
  <div className="app_container">
    <NavBar />
    <>{props.children}</>
    <Footer />
  </div>
);

export default Layout;
