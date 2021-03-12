import { useReducer, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import ReducerContext from './context/reducerContext';
import InsporingQuote from './components/InspiringQuote/InspiringQuote';
import { reducer, intialState } from './reducer';
import Home from './pages/Home/Home';
import Car from './pages/Car/Car';
import Search from './pages/Search/Search';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import ErrorBoundary from './hoc/ErrorBoundary';
import AddCar from './pages/Profile/MyCars/AddCar/AddCar';
import EditCar from './pages/Profile/MyCars/EditCar/EditCar';

const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  const header = (
    <Header>
      <InsporingQuote />
      <Searchbar />
      <ThemeButton />
    </Header>
  );
  const content = (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<p>Ładowanie...</p>}>
          <Switch>

            <AuthenticatedRoute path="/profil/samochody/edytuj/:id" component={EditCar} />
            <AuthenticatedRoute path="/profil/samochody/dodaj" component={AddCar} />
            <AuthenticatedRoute path="/profil" component={Profile} />
            <Route path="/samochody/:id" component={Car} />
            <Route path="/wyszukaj/:term?" component={Search} />
            <Route path="/zaloguj" component={Login} />
            <Route path="/rejestracja" component={Register} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />

          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
  const menu = <Menu />;
  const footer = <Footer />;

  return (
    <Router>
      <AuthContext.Provider value={{
        user: state.user,
        login: (user) => dispatch({ type: 'login', user }),
        logout: () => dispatch({ type: 'logout' }),
      }}>
        <ThemeContext.Provider value={{
          color: state.theme,
          changeTheme: () => dispatch({ type: 'change-theme' })
        }}>
          <ReducerContext.Provider value={{
            state: state,
            dispatch: dispatch
          }}>

            <Layout
              header={header}
              menu={menu}
              content={content}
              footer={footer}
            />

          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
