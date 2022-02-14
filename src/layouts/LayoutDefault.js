import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <>
    <main className="site-content">
      {children}
    </main>
  </>
);

export default LayoutDefault;  