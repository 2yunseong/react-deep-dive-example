export type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

export type Store<State> = {
  /** 항상 최신값을 가져오는 get */
  get: () => State;
  /** 상태를 변경하는 set. 값이나 함수를 받을 수 있다. */
  set: (action: Initializer<State>) => State;
  /** store의 변경을 감지하고 싶은 컴포넌트들이 자신의 callback함수를 등록해두는 곳 */
  subscribe: (callback: () => void) => () => void;
};

export const createStore = <State extends unknown>(
  initialState: Initializer<State>
): Store<State> => {
  let state =
    typeof initialState !== "function" ? initialState : initialState();

  // callback은 자료형에 관계없이 유일한 값을 저장할 수 있는 Set을 사용한다.
  const callbacks = new Set<() => void>();
  const get = () => state;
  const set = (nextState: Initializer<State>) => {
    state =
      typeof nextState === "function"
        ? (nextState as (prev: State) => State)(state)
        : nextState;

    // cabllbacks에 등록된 모든 callback함수를 실행한다.
    callbacks.forEach((callback) => callback());
    return state;
  };

  const subscribe = (callback: () => void) => {
    // callback을 callbacks에 등록한다.
    callbacks.add(callback);

    // useEffect의 cleanup 함수로, callback을 삭제한다.
    return () => {
      callbacks.delete(callback);
    };
  };
  return { get, set, subscribe };
};
