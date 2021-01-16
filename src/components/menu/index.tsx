import React from 'react';
import styles from './index.module.less';

const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.folder}>
        <p>folder</p>
        <ul className={styles.sub}>
          <li>title1</li>
          <li>title1</li>
          <li>title1</li>
          <li>title1</li>
          <li>title1</li>
          <li>title1</li>
          <li>title1</li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;