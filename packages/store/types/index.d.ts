import { Dispatch, Reducer } from 'react';
export interface Action<State, ActionType> {
    type: ActionType;
    payload: {
        data: State;
    };
}
declare const createStoreHook: <State, ActionType>(reducer: Reducer<State, Action<State, ActionType>>, initialState: State) => () => [State, Dispatch<Action<State, ActionType>>];
export default createStoreHook;
//# sourceMappingURL=index.d.ts.map