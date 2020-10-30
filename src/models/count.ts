import { createModel } from '@rematch/core';
import { RootModel } from './models';

export const count = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment(state, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number, state) {
      console.log('incrementAsync', 'current state: ', state);
      await new Promise(res => setTimeout(res, 1000));
      dispatch.count.increment(payload);
    },
  }),
});