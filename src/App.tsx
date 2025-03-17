
import { useSelector} from "react-redux"
import { RootState } from "./Store"
import { CateroryTransaction } from "./App/Data/Data"
import { Nav } from "./Widgets/Nav/Nav"
import styles from "../src/App/Styles/App.module.css"
import { Main } from "./Pages/Main/Main"
function App() {


  // const transactions = useSelector((state:RootState)=>state.transactionsSlice)
return(<>
  <div className={styles.mainWrap}>
  <Nav/>
  <Main/>


  </div>

  </>)
}

export default App
