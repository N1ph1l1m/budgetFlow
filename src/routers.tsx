
import "./index.css"
import { MainPage } from "./Pages/Main/MainPage";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from "./Pages/App/App"
import { Analitics } from "./Pages/Analitics/Analitics";
import { InputTransaction } from "./Shared/InputTransaction/InputTransaction";
import { CateroryTransaction } from "./App/Data/Data";
import Setting from "./Pages/Setting/Setting";

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
