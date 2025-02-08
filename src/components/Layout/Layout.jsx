import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loader from "../Loader/Loader";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
