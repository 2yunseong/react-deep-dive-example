import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { Store, createStore } from "../state/state";
import { useStoreSelector } from "../state/useStore";

interface CounterStore {
  count: number;
}

export const CounterStoreContext = createContext<Store<CounterStore>>(
  createStore<CounterStore>({ count: 0 })
);

export const CounterStoreProvider = ({
  initialState,
  children,
}: PropsWithChildren<{ initialState: CounterStore }>) => {
  const storeRef = useRef<Store<CounterStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore<CounterStore>(initialState);
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useCounterContextSelector = <State extends unknown>(
  selector: (state: CounterStore) => State
) => {
  const store = useContext(CounterStoreContext);
  const subscription = useStoreSelector(store, (state) =>
    selector(state as CounterStore)
  );

  return [subscription, store.set] as const;
};
