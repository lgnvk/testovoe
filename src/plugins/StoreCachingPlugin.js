import { CacheService } from '../services';

export default function saveToLocalStorage(store) {
  store.subscribe((mutation) => {
    if (mutation.type === 'setState') {
      const { payload } = mutation;
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'data') {
          CacheService.setItem(key, value);
        }
      });
    }
  });
}
