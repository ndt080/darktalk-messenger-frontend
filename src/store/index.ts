import { createStore, useStore as baseUseStore, Store } from "vuex";
import AuthStoreModule from "@/store/modules/auth-store.module";
import { State } from "./models/state.model";
import { InjectionKey } from "vue";

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: { AuthStoreModule }
});

export const useStore = ():Store<State> => baseUseStore(key);