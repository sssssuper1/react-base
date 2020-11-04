import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
import { RootState, Dispatch } from '@/models/store';
import styles from './index.module.less';

const mapState = (state: RootState) => ({
  count: state.count,
  loading: state.loading.models.count,
});

const mapDispatch = (dispatch: Dispatch) => ({
  increment: () => dispatch.count.increment(1),
  incrementAsync: () => dispatch.count.incrementAsync(1),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

const Home: React.FC<StateProps & DispatchProps & RouteComponentProps> = ({
  count,
  loading,
  increment,
  incrementAsync,
  history,
}) => {
  const goHome = () => {
    history.push('/test');
  };
  return (
    <div className={styles.bg}>
      <header>
        <p>count: <code>{count}</code></p>
      </header>
      <div>
        <Button type="primary" onClick={increment}>+1</Button>
        <Button loading={loading} onClick={incrementAsync}>+1 after 1s</Button>
      </div>
      <div>
        <Button onClick={goHome}>home</Button>
      </div>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Home);
