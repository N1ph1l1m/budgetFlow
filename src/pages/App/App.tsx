
import { Nav } from "../../widget/Nav/Nav";
import styles from "../../app/styles/App.module.css";
import { Outlet } from "react-router";
import { useLocation } from "react-router"
export default function App() {

  const location = useLocation()


return(<>
  <div className={styles.mainWrap}>
  <Nav isButton={location.pathname !== "/setting/"} location = {location.pathname} />
   <div className={styles.outletWrap}><Outlet/></div>
  </div>
  </>)
}
