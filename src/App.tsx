import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './sass/App.scss';
import './sass/index.scss';
import './sass/normalize.scss';
import { ROUTES_LIST } from './utils/router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import { AppContextData } from './data/interfaces';
import { LANG_RU } from './data/constants';
import { CONFIRM_MODAL_DEFAULT } from './data/constantsV';
import { confirmReducer, boardsReducer } from './utils/reducers';

export const AppContext = createContext({} as AppContextData);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [lang, switchLang] = useState(LANG_RU);
  const [boards, dispatchBoards] = useReducer(boardsReducer, []);
  const [confirm, dispatchConfirm] = useReducer(confirmReducer, CONFIRM_MODAL_DEFAULT);

  useEffect(() => {
    if (localStorage.getItem('pmapp34-token')) {
      setIsAuth(true);
    }
  }, []);

  const store = useMemo(
    () => ({
      lang,
      switchLang,
      isAuth,
      setIsAuth,
      boards,
      dispatchBoards,
      confirm,
      dispatchConfirm,
    }),
    [lang, isAuth, boards, confirm]
  );

  return (
    <AppContext.Provider value={store}>
      <BrowserRouter>
        <Header />
        <main className="main-container">
          <Routes>
            {ROUTES_LIST.map(({ path, element }, ind) => (
              <Route path={path} element={element} key={`route_${ind + 1}`} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      {confirm.isOpen && <ConfirmModal />}
    </AppContext.Provider>
  );
}

export default App;
