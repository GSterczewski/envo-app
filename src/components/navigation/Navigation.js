
import { NavLink } from "react-router-dom";
import style from "./navigation.module.scss";
import { FaWallet, FaCreditCard, FaThLarge, FaChartBar } from "react-icons/fa";



const Navigation = () => {

  const links = [
    {
    route: "/home",
    icon: <FaThLarge className={style.link__icon}/>,
    name: "dashboard"
  },
  {
    route: "/budgets",
    icon: <FaWallet className={style.link__icon}/>,
    name: "budgets"
  },
  {
    route: "/expenses",
    icon: <FaCreditCard className={style.link__icon}/>,
    name: "expenses"
  },
  {
    route: "/stats",
    icon: <FaChartBar  className={style.link__icon}/>,
    name: "stats"
  }
]

  return (
    <aside className={style.sidebar}>
    <nav className={style.links}>
      {links.map(link => (<NavLink key={link.name} to={link.route} className={style.link} activeClassName={style.link_active}>{link.icon}</NavLink>))}
    </nav>
    </aside>
  )
}

export default Navigation;