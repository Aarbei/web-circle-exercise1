import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import MenuItemDetails from "./components/MenuItem/MenuItemDetails.jsx";
import RestaurantView from "./views/RestaurantView.jsx";
import { WishlistProvider } from "./context/WishListContext.jsx";
import WishlistView from "./views/WishListView.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<RestaurantView />} />
        <Route path="/meals/:id" element={<MenuItemDetails />} />
        <Route path="/*" element={<p>404 Page not found</p>} />
        <Route path="/wishlist" element={<WishlistView />} />
      </Routes>
    </Router>
  );
}

// Wrap App in an ErrorBoundary to help us with development bugs

export default function WrappedApp() {
  return import.meta.env.MODE === "development" ? (
    <ErrorBoundary>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ErrorBoundary>
  ) : (
    <WishlistProvider>
      <App />
    </WishlistProvider>
  );
}
