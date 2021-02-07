
import style from "./layout.module.scss";
import Header from "components/header/Header";
import Navigation from "components/navigation/Navigation";

const Layout = ({children}) => (
  <div className={style.wrapper}>
    <div className={style.header_container}>
    <Header />
    </div>
    <div className={style.navigation_container}>
      <Navigation />
    </div>
    <main className={style.view_container}>{ children }</main>
   
  </div>
);

export default Layout;