import React from 'react';
import Menu from '@/components/menu';
import Header from './header';
import styles from './index.module.less';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Menu />
      </div>
    </div>
  );
};

export default Home;
