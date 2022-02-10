import { StoreFragment, transformClass } from 'pinia-class-transformer';
import { defineStore } from 'pinia';

class State {
    theme = 'light';

    isBreadCrumbVisible = true;
}

class Main extends StoreFragment<State, Main> {}

const useMainStore = defineStore('main', () => transformClass({ state: State, fragment: Main }));

export default useMainStore;
