
import { Nav } from "../../widget/Nav/Nav";
import styles from "../../App/Styles/App.module.css";
import { Outlet } from "react-router";
import { useLocation } from "react-router"
export default function App() {

  const location = useLocation()


return(<>
  <div className={styles.mainWrap}>
  <Nav isButton={location.pathname !== "/setting/"} />
    <Outlet/>
  </div>
  </>)
}
