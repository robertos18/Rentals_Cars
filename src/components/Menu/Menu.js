import style from './Menu.module.css';
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  }

  return (
    <div className={`${style.menuContainer} breadcrumb`}>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <NavLink exact to="/" activeClassName={style.menuItemActive}>
            Strona domowa
          </NavLink>
        </li>
        {auth ? (
          <>
            <li className={style.menuItem}>
              <NavLink to="/profil" activeClassName={style.menuItemActive}>
                Mój profil
                </NavLink>
            </li>
            <li className={style.menuItem}>
              <a href="#" onClick={logout}>Wyloguj</a>
            </li>
          </>
        ) : (
          <>
            <li className={style.menuItem}>
              <NavLink activeClassName={style.menuItemActive} to="/rejstracja">
                Zarejestruj
                </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink activeClassName={style.menuItemActive} to="/zaloguj">
                Zaloguj
                </NavLink>
            </li>
          </>
        )
        }
      </ul>
    </div>
  );
}

export default Menu;