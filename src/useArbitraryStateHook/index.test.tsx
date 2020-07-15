import { renderHook, act } from '@testing-library/react-hooks';
import { useArbitraryState } from './index';

test('Empty default state Failed on useArbitraryState', () => {
    const defaultEmptyState = [{ user: 'SomeOne' }];
    const defaultValue = {} as { user: string };
    try {
        renderHook(() => useArbitraryState<{ user: string }>(defaultEmptyState, defaultValue));
    } catch (err) {
        expect(err.message).toBe(`Initial Value ${JSON.stringify(defaultValue)} isn't in states`);
    }
});

test('Empty Failed on useArbitraryState', () => {
    const defaultEmptyState: [] = [];
    const defaultValue = { user: 'SomeOne' };
    try {
        renderHook(() => useArbitraryState<{ user: string }>(defaultEmptyState, defaultValue));
    } catch (err) {
        expect(err.message).toBe('You passed an empty states');
    }
});

test('No state value Failed on useArbitraryState', () => {
    const defaultEmptyState = [{ user: 'SomeOne' }];
    const defaultValue = { user: 'SomeOne' };
    const { result } = renderHook(() => useArbitraryState<{ user: string }>(defaultEmptyState, defaultValue));

    try {
        act((): void => {
            result.current[1]({ user: 'Somebody else' });
        });
    } catch (err) {
        expect(err.message).toBe(`${JSON.stringify({ user: 'Somebody else' })} isn't in initial arbitrary state`);
    }
});

test('State Success on useArbitraryState', () => {
    const defaultEmptyState = [{ user: 'SomeOne' }, { user: 'Somebody else' }];
    const defaultValue = { user: 'SomeOne' };
    const { result } = renderHook(() => useArbitraryState<{ user: string }>(defaultEmptyState, defaultValue));

    act((): void => {
        result.current[1]({ user: 'Somebody else' });
    });
    expect(result.current[0]).toEqual({ user: 'Somebody else' });
});
