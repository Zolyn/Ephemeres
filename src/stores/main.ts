import { StoreFragment, transformClass } from 'pinia-class-transformer';
import { defineStore } from 'pinia';

class State {
    msg = 'A message';
}

class Main extends StoreFragment<State, Main> {
    say(): void {
        console.log(this.state.msg);
    }
}

const useStore = defineStore('main', transformClass({ state: State, fragment: Main }));

export default useStore;
