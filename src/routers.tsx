
import "./index.css"
import { MainPage } from "./pages/Main/MainPage";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from "./pages/App/App"
import { Analitics } from "./pages/Analitics/Analitics";
import { InputTransaction } from "./shared/InputTransaction/InputTransaction";
import { CateroryTransaction } from "./app/data/Data";
import Setting from "./pages/Setting/Setting";

function Routers() {
const router = createBrowserRouter ([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<MainPage/>
      },
      {
        path:"analitics/",
        element:<Analitics/>
      },
      {
        path:"rate/",
        element:<InputTransaction  title="Расходы" typeItem="rate" categories={CateroryTransaction.rate} />
      },
      {
        path:"income",
        element:<InputTransaction title="Доходы" typeItem="income" categories={CateroryTransaction.income} />
      },
      {
        path:"setting",
        element:<Setting/>
      },
    ]
  },

])

return(
  <div className="wrapRoute">
    <RouterProvider router={router}/>
    </div>

)
}
export default Routers;
