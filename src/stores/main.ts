import { createOptions, Store } from 'pinia-store-decorators';

@Store
class Main {
    public msg = 'MainStore!';

    public say() {
        console.log(this.msg);
    }
}

const useStore = defineStore(createOptions('MainStore', Main));

export default useStore;
