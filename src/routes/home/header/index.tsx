import React from 'react';
import styles from './index.module.less';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.avater} />
      <div className={styles.description}>
        <p>scalpel..</p>
      </div>
    </div>
  );
};

export default Header;