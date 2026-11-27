import React from 'react';
import logo from '../../assets/logo.png';
import styles from './header.module.css';

function Header() {
  return (
    <div className={styles.brandHeader}>
      <img src={logo} alt="Bright Ideas Logo" />
    </div>
  );
}

export default Header;