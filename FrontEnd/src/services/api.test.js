import { describe, it, expect, beforeEach, vi } from 'vitest';
import API from './api';

describe('API Axios Interceptor', () => {
  beforeEach(() => {
    // Reset localStorage mock
    const store = {};
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => store[key]);
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((key, val) => { store[key] = val; });
    vi.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation((key) => { delete store[key]; });
    window.localStorage.clear?.();
  });

  it('agrega Authorization header cuando hay token', async () => {
    localStorage.setItem('authToken', 'test_token_123');

    const cfg = await API.interceptors.request.handlers[0].fulfilled({ headers: {}, method: 'get', url: '/test' });
    expect(cfg.headers.Authorization).toBe('Bearer test_token_123');
  });

  it('no agrega Authorization header cuando no hay token', async () => {
    const cfg = await API.interceptors.request.handlers[0].fulfilled({ headers: {}, method: 'get', url: '/test' });
    expect(cfg.headers.Authorization).toBeUndefined();
  });
});
