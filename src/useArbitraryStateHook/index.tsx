import { Dispatch, useEffect, useState } from 'react';

const deepEqualCheck = (first: any, second: any): boolean => {
    return JSON.stringify(first) === JSON.stringify(second);
};

function useArbitraryState<T>(states: Array<T>, defaultValue: T): [T, Dispatch<T>] {
    const [initialValue, setInitial] = useState<any>(defaultValue);

    useEffect((): void => {
        // Check if we have empty array of states
        if (!states.length) {
            throw new Error(`You passed an empty states`);
        }

        //Check if we have initialValue in array of states
        const isInInitialState = states.find((state): boolean => deepEqualCheck(state, defaultValue));

        if (!isInInitialState) {
            throw new Error(`Initial Value ${JSON.stringify(defaultValue)} isn't in states`);
        }
    }, []);

    useEffect((): void => {

        //Check if we have new initialValue in array of states
        const foundedValue = states.find((state): boolean => deepEqualCheck(state, initialValue));

        if (!foundedValue) {
            throw new Error(`${JSON.stringify(initialValue)} isn't in initial arbitrary state`);
        }
    }, [initialValue]);

    // Returns current initialValue and function for updating this value
    return [initialValue, setInitial];
}

export { useArbitraryState };
