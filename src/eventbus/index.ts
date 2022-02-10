import mitt from 'mitt';

type Events = {
    scroll: ScrollToOptions;
};

const emitter = mitt<Events>();

export default emitter;
