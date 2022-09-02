import { LANG_EN, LS_LANG_KEY, LS_TOKEN_KEY } from 'data/constants';
import { AppContextData, Languages } from 'data/interfaces';
import { ReactNode, useEffect, useReducer, useMemo, useState, createContext } from 'react';
import { boardsReducer } from 'store/reducers/reducers';

export const AppContext = createContext({} as AppContextData);

const StoreWrapper = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isSpinning, setSpinner] = useState(false);
  const [lang, switchLang] = useState(LANG_EN);
  const [boards, dispatchBoards] = useReducer(boardsReducer, []);

  useEffect(() => {
    if (localStorage.getItem(LS_TOKEN_KEY)) {
      setIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    if (localStorage.getItem(LS_LANG_KEY)) {
      switchLang(localStorage.getItem(LS_LANG_KEY) as Languages);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem(LS_TOKEN_KEY);
    setIsAuth(false);
  };

  const store = useMemo(
    () => ({
      lang,
      switchLang,
      isAuth,
      setIsAuth,
      boards,
      dispatchBoards,
      logoutUser,
      isSpinning,
      setSpinner,
    }),
    [lang, isAuth, boards, isSpinning]
  );

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default StoreWrapper;
