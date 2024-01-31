import { useEffect, useState } from "react";
import { Store } from "./state";

export const useStore = <State extends unknown>(store: Store<State>) => {
  const [state, setState] = useState(() => store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.get());
    });
    return unsubscribe;
  }, [store]);

  return [state, store.set] as const;
};

export const useStoreSelector = <State extends unknown, Value extends unknown>(
  store: Store<State>,
  selector: (state: State) => Value // selector는 state를 받아서 원하는 특정한 값을 리턴하는 함수.
) => {
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.get()));
    });
    return unsubscribe;
  }, [store, selector]);

  return state;
};
