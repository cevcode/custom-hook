import React, { ReactElement } from 'react';
import logo from './logo.svg';
import './App.css';
import { useArbitraryState } from './useArbitraryStateHook';

function App() {
    //Initialize default arr of states for testing the hook
    const backgroundColorStates = [{ color: 'red' }, { color: 'blue' }, { color: 'green' }];
    //Initialize arr of states with values which we have in default array, and values which should return us error.
    const allColorStates = [
        { color: 'red' },
        { color: 'blue' },
        { color: 'green' },
        { color: 'white' },
        { color: 'black' },
    ];

    const [defaultState, setArbitraryState] = useArbitraryState<{
        color: string;
    }>(backgroundColorStates, { color: 'red' });

    return (
        <div className="App" style={{ backgroundColor: defaultState.color }}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {allColorStates.map(
                    ({ color }): ReactElement => (
                        <div key={color} className="input-wrapper">
                            <input
                                id={color}
                                type="radio"
                                checked={color === defaultState.color}
                                onChange={() => setArbitraryState({ color })}
                            />
                            <label htmlFor={color}>{color}</label>
                        </div>
                    )
                )}
            </header>
        </div>
    );
}

export { App };
