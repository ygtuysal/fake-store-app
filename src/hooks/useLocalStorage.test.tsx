import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key1', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('returns stored value from localStorage if exists', () => {
    localStorage.setItem('key2', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('key2', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates localStorage and state when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('key3', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('key3')).toBe(JSON.stringify('updated'));
  });

  it('handles function-style updates', () => {
    const { result } = renderHook(() => useLocalStorage('key4', 0));

    act(() => {
      result.current[1]((prev) => prev + 2);
    });

    expect(result.current[0]).toBe(2);
    expect(localStorage.getItem('key4')).toBe('2');
  });

  it('works with complex objects', () => {
    const initial = { user: 'john', roles: ['admin'] };
    const updated = { user: 'jane', roles: ['user'] };

    const { result } = renderHook(() => useLocalStorage('key5', initial));

    act(() => {
      result.current[1](updated);
    });

    expect(result.current[0]).toEqual(updated);
    expect(JSON.parse(localStorage.getItem('key5')!)).toEqual(updated);
  });

  it('gracefully handles localStorage setItem error', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockSetItem = jest.fn(() => {
      throw new Error('Mocked error');
    });

    Object.defineProperty(window, 'localStorage', {
      value: { ...localStorage, setItem: mockSetItem },
      writable: true,
    });

    const { result } = renderHook(() => useLocalStorage('key6', 'value'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error setting localStorage'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('syncs value across multiple tabs/hooks', () => {
    const { result: hookA } = renderHook(() => useLocalStorage('shared', 'init'));
    const { result: hookB } = renderHook(() => useLocalStorage('shared', 'init'));

    act(() => {
      hookA.current[1]('updated');
    });

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'shared',
          newValue: JSON.stringify('updated'),
        })
      );
    });

    expect(hookB.current[0]).toBe('updated');
  });
});
