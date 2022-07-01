import { createStore, Store, useStore as baseUseStore } from "vuex";
import { State } from "./models/state.model";
import { InjectionKey } from "vue";

import AuthStoreModule from "@/store/modules/auth-store.module";
import ChatsStoreModule from "@/store/modules/chats-store.module";
import AppSocketStoreModule from "@/store/modules/app-socket-store.module";


export const store = createStore<State>({
  modules: {
    AuthStoreModule,
    ChatsStoreModule,
    AppSocketStoreModule,
  }
});

export const key: InjectionKey<Store<State>> = Symbol();
export const useStore = (): Store<State> => baseUseStore(key);
