
import "./index.css"
import { Main } from "./Pages/Main/Main"
import { Route, Routes } from "react-router-dom";
import App from "./Pages/App/App"
import { Analitics } from "./Pages/Analitics/Analitics";
import { InputTransaction } from "./Shared/InputTransaction/InputTransaction";
import { CateroryTransaction } from "./App/Data/Data";
export default function Routers() {


return(<div className="wrapRoute">
  <Routes>
    <Route path="/" element={<App/>}>
      <Route index  element={<Main/>} />
      <Route path="analitics/" element={<Analitics/>} />
      <Route path="rate/" element={<InputTransaction  title="Расходы" typeItem="rate" categories={CateroryTransaction.rate} />} />
      <Route path="income/" element={ <InputTransaction title="Доходы" typeItem="income" categories={CateroryTransaction.income} />} />
    </Route>
  </Routes>

  </div>)
}
