import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";
import { Link } from "react-router-dom";
import navBarStyles from "../components/NavBar/NavBar.module.css";

const RestaurantView = () => {
  const [allDishes, setAllDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [query, setQuery] = useState("");

  // useDebouncedCallback takes a function as a parameter and as the second parameter
  // the number of milliseconds it should wait until it is actually called so a user
  // can type freely and as long as they are typing a letter quicker than 500ms, the function won't fire yet.
  // This is to optimize user experience and communication with the server

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((result) => {
        const meals = result.meals ?? [];
        // Now we will sort meals in alphabetical order
        const sortedMeals = meals.sort((a, b) =>
          a.strMeal.localeCompare(b.strMeal)
        );
        setAllDishes(sortedMeals);
        setFilteredDishes(sortedMeals);
      })
      .catch(() => {
        setAllDishes([]);
        setFilteredDishes([]);
      });
  }, []);

  useEffect(() => {
    const normalizedQuery = query.toLowerCase();
    const filtered = allDishes.filter((dish) =>
      dish.strMeal.toLowerCase().includes(normalizedQuery)
    );
    setFilteredDishes(filtered);
  }, [query, allDishes]);
  // This cleanup function is to prevent multiple API calls coming back out of sequence and setting the value of our dishes list.
  // Example:
  // 1. First search query is pizza -> Network request takes 5 seconds to fetch data
  // 2. In the meantime, the user types burger instead -> Network request takes 1 second and shows burgers in the list
  // 3. Then, finally, the first data fetch comes back and overwrites the results, so the search box shows 'burger'
  //    but the results show pizzas. This is called "stale data"

  // useEffect can take a variable that is a function and does not need to be defined as an anonymous () => {} arrow function
  // This is especially important when using more controlled techniques like debouncing

  //Since we are not making a new API
  // request on every keystroke, there is no risk of stale data,
  // and therefore we do not need a cleanup function here.

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <Link className={navBarStyles.navBarLink} to="/wishlist">
          Wishlist
        </Link>
        <SearchField value={query} onChange={setQuery} />
      </NavBar>

      <div className={styles.restaurantWrapper}>
        <div className={styles.menu}>
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <MenuItem dish={dish} key={dish.idMeal} />
            ))
          ) : (
            <p>No dishes found :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantView;
