import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomepageSkeleton from "./components/skeletons/Homepage.skeleton";
import PopupNotification from "./components/PopupNotification";

const HomePage = lazy(() => import("./pages/HomePage"));

const App: React.FC = () => {
  return (
    <>
      <PopupNotification />
      <Suspense fallback={<HomepageSkeleton />}>
        <div className="container mx-auto p-6">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default App;
