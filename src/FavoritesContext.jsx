import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'shoppy-favorites';

const FavoritesContext = createContext();

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

// Favorites are kept in localStorage as small product snapshots, so the
// favorites page works without loading the whole catalog
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((product) => product.id === id);

  const toggleFavorite = (product) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              oldPrice: product.oldPrice,
              image: product.image,
              category: product.category,
              categoryId: product.categoryId,
            },
          ]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
