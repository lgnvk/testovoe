export default function saveToLocalStorage(store) {
  store.subscribe((mutation, _) => {
    if (mutation.type === 'setState') {
      const { payload } = mutation;
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'data') {
          localStorage.setItem(key, JSON.stringify(value));
        }
      });
    }
  });
}
