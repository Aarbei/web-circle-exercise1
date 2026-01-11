import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./MenuItem.module.css";
import { useWishlist } from "../../context/WishListContext.jsx";

const MenuItem = ({ dish }) => {
  const { strMeal: name, strMealThumb: image } = dish;
  const navigate = useNavigate();

  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.idMeal === dish.idMeal);
  return (
    <div className={styles.menuItem}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className={styles.menuItemBtnContainer}>
        <Button onClick={() => navigate(`/meals/${dish.idMeal}`)}>
          Details
        </Button>
      </div>
      {isInWishlist ? (
        <Button onClick={() => removeFromWishlist(dish.idMeal)}>
          Remove from wishlist
        </Button>
      ) : (
        <Button onClick={() => addToWishlist(dish)}>Add to wishlist</Button>
      )}
    </div>
  );
};

export default MenuItem;
