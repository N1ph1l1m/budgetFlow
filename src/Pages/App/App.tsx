

import { Nav } from "../../Widgets/Nav/Nav"
import styles from "../../App/Styles/App.module.css";
import { Outlet } from "react-router";
export default function App() {


return(<>
  <div className={styles.mainWrap}>
  <Nav/>
    <Outlet/>
  </div>
  </>)
}
