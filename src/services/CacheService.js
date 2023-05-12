const CacheService = {
  getItem(item) {
    return JSON.parse(localStorage.getItem(item));
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default CacheService;
