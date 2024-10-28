import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import CamperDetailPage from "../../pages/CamperDetailPage/CamperDetailPage.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import Features from "../Features/Features.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id/*" element={<CamperDetailPage />}>
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
