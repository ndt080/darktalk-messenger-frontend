import { createStore, useStore as baseUseStore, Store } from "vuex";
import { State } from "./models/state.model";
import { InjectionKey } from "vue";
import AuthStoreModule from "@/store/modules/auth-store.module";
import RoomsStoreModule from "@/store/modules/rooms-store.module";

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: { AuthStoreModule, RoomsStoreModule }
});

export const useStore = ():Store<State> => baseUseStore(key);