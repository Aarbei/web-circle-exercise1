import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (dish) => {
    setWishlist((prev) =>
      prev.some((item) => item.idMeal === dish.idMeal) ? prev : [...prev, dish]
    );
  };

  const removeFromWishlist = (idMeal) => {
    setWishlist((prev) => prev.filter((item) => item.idMeal !== idMeal));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
