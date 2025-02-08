import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "../Loader/Loader";
import PrivateRoute from "../../routes/PrivateRoute";
import PublicRoute from "../../routes/PublicRoute";

import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUserThunk } from "../../redux/auth/operations";

const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ObservationPage = lazy(() =>
  import("../../pages/ObservationPage/ObservationPage")
);
const ForecastPage = lazy(() =>
  import("../../pages/ForecastPage/ForecastPade")
);
const Layout = lazy(() => import("../../components/Layout/Layout"));

function App() {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefresh ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PrivateRoute component={<Layout />} />}>
          <Route index element={<ObservationPage />} />

          <Route path="forecast" element={<ForecastPage />} />
        </Route>
        <Route
          path="/register"
          element={<PublicRoute component={<RegistrationPage />} />}
        />

        <Route
          path="/login"
          element={<PublicRoute component={<LoginPage />} />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
