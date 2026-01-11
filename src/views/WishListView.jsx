import { useWishlist } from "../context/WishListContext.jsx";
import MenuItem from "../components/MenuItem/MenuItem";

const WishlistView = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <p>Your wishlist is empty</p>;
  }

  return (
    <div>
      <h1>Your wishlist</h1>
      {wishlist.map((dish) => (
        <MenuItem key={dish.idMeal} dish={dish} />
      ))}
    </div>
  );
};

export default WishlistView;
