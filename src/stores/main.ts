import { transformClass } from 'pinia-class-transformer';
import { defineStore } from 'pinia';

class Main {
    theme = 'light';

    isLoading = true;

    isBreadCrumbVisible = true;

    savedPositionMap = new Map<string, ScrollToOptions>();
}

const useMainStore = defineStore('main', transformClass(Main));

export default useMainStore;
