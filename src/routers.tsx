
import "./index.css"
import { MainPage } from "./pages/Main/MainPage";
import { createBrowserRouter, RouterProvider,redirect} from "react-router-dom";
import App from "./pages/App/App"
import { Review } from "./pages/Review/Review";
import Authorization from "./pages/Authorization/Authorization";
import Setting from "./pages/Setting/Setting";


function Routers() {

// function checkToken() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//  throw redirect("/authorization/");
//   }
//   return null;
// }

const router = createBrowserRouter ([
  {
    path:"/",
    element:<App/>,
   // loader:checkToken,
    children:[
      {
        index:true,
        element:<MainPage/>
      },
      {
        path:"review/",
        element:<Review/>
      },
      {
        path:"setting",
        element:<Setting/>
      },
    ]

  },{
    path:"authorization/",
    element:<Authorization/>
  }

])

return(
  <div className="wrapRoute">
    <RouterProvider router={router}/>
    </div>

)
}
export default Routers;
