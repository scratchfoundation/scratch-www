import {useState} from 'react';

export const usePrevious = (
    value,
    comparator = (prev, current) => prev === current
) => {
    const [state, setState] = useState({
        value: value,
        prev: null
    });

    const current = state.value;

    if (!comparator(current, value)) {
        setState({
            value: value,
            prev: current
        });
    }

    return state.prev;
};
