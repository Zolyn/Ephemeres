interface BaseTransitionProps {
    mode?: 'in-out' | 'out-in';
    appear?: boolean;
}

interface CommonTransitionProps extends BaseTransitionProps {
    enterDuration?: number;
    leaveDuration?: number;
}

interface SlideTransitionProps extends CommonTransitionProps {
    offset?: number;
    reverse?: boolean;
}

export type { BaseTransitionProps, CommonTransitionProps, SlideTransitionProps };
