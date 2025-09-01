const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const getCached = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
};

export const setCache = (key, data, ttl = CACHE_TTL) => {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};

export const clearCache = () => {
  cache.clear();
};