import "./index.css";
import { MainPage } from "./pages/Main/MainPage";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import App from "./pages/App/App";
import Authorization from "./pages/Authorization/Authorization";
import Setting from "./pages/Setting/Setting";
import AllTime from "./pages/Review/AllTime";
import Custom from "./pages/Review/Custom";
import Month from "./pages/Review/Month";

function Routers() {
  function privateRouter() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect("/authorization/");
    }
    return null;
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      loader: privateRouter,

      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "month",
          element: <Month />,

        },
        {
          path: "allTime",
          element: <AllTime />,
        },
        {
          path: "custom",
          element: <Custom />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
      ],
    },
    {
      path: "authorization/",
      element: <Authorization />,
    },
  ]);

  return (
    <div className="wrapRoute">
      <RouterProvider router={router}       />

    </div>
  );
}
export default Routers;
