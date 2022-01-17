import { Store } from 'vuex'
import { State } from "./models/state.model";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}