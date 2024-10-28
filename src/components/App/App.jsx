import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CamperDetailPage = lazy(() =>
  import("../../pages/CamperDetailPage/CamperDetailPage.jsx")
);
const Navigation = lazy(() => import("../Navigation/Navigation.jsx"));
const Features = lazy(() => import("../Features/Features.jsx"));
const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  return (
    <Suspense fallback={<div></div>}>
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
    </Suspense>
  );
};

export default App;
