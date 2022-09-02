import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { FORM_TIMEOUT, LS_TOKEN_KEY } from 'data/constants';
import './LoginPage.scss';
import { AppContext } from 'store/storeWrapper';
import getToken from '../../api/getToken';
import loginWithToken from '../../api/loginWithToken';
import getResponseOnCreatingUser from '../../api/getResponseOnCreatingUser';
import isPassValid, { isNameLoginValid } from '../../utils/validation';
import dict from '../../data/dict';

function LoginPage() {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [login, setLogin] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const { isAuth, setSpinner, lang } = useContext(AppContext);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (isAuth && localStorage.getItem(LS_TOKEN_KEY)) {
      navigate('/');
    }
  }, [isAuth]);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameValid(true);
  };
  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setIsLoginValid(true);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(true);
  };
  const createUser = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), FORM_TIMEOUT);
    const isInputDataValid =
      isNameLoginValid(name) && isNameLoginValid(login) && isPassValid(password);
    if (!isInputDataValid) {
      setIsNameValid(isNameLoginValid(name));
      setIsLoginValid(isNameLoginValid(login));
      setIsPasswordValid(isPassValid(password));
      return;
    }
    const response = await getResponseOnCreatingUser(name, login, password, setSpinner, lang);
    if (response.ok) {
      const token = await getToken(login, password, setSpinner, lang);
      loginWithToken(token as string, context.setIsAuth);
      navigate('/');
    }
  };

  const logIn = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), FORM_TIMEOUT);
    const isInputDataValid = isNameLoginValid(login) && isPassValid(password);
    if (!isInputDataValid) {
      setIsLoginValid(isNameLoginValid(login));
      setIsPasswordValid(isPassValid(password));
      return;
    }
    const token = await getToken(login, password, setSpinner, lang);
    if (token) {
      loginWithToken(token, context.setIsAuth);
      navigate('/');
    }
  };

  return (
    <div className="narrow-container">
      <h1 className="login__title">
        {isLogin ? dict[lang].loginPage.signInHeader : dict[lang].loginPage.signUpHeader}
      </h1>
      <p className="login__description">
        {isLogin ? dict[lang].loginPage.signInText : dict[lang].loginPage.signUpText}
      </p>
      <form className="login__form">
        {isLogin ? null : (
          <div className="login__form-field login__form-field_text">
            <label htmlFor="name">
              {dict[lang].forms.nameLabel}
              <input
                className="registration__form_input"
                type="text"
                placeholder={dict[lang].forms.namePholder}
                id="name"
                value={name}
                onInput={handleNameInput}
              />
            </label>
            {isNameValid ? null : (
              <div className="login__invalid-field">{dict[lang].forms.nameLoginValid}</div>
            )}
          </div>
        )}
        <div className="login__form-field login__form-field_text">
          <label htmlFor="login">
            {dict[lang].forms.loginLabel}
            <input
              className="login__form_input"
              type="text"
              placeholder={dict[lang].forms.loginPholder}
              id="login"
              onInput={handleLoginInput}
            />
          </label>
          {isLoginValid ? null : (
            <div className="login__invalid-field">{dict[lang].forms.nameLoginValid}</div>
          )}
        </div>
        <div className="login__form-field login__form-field_text">
          <label htmlFor="password">
            {dict[lang].forms.passwordLabel}
            <input
              className="login__form_input"
              type="password"
              placeholder={dict[lang].forms.passwordPholder}
              id="password"
              onInput={handlePasswordInput}
              autoComplete="on"
            />
          </label>
          {isPasswordValid ? null : (
            <div className="login__invalid-field">{dict[lang].forms.passwordValid}</div>
          )}
        </div>
        {isLogin ? (
          <input
            className={`login__form_submit ${isButtonDisabled ? 'temp-disabled' : ''}`}
            type="submit"
            value={dict[lang].buttons.signIn}
            disabled={!(login && password)}
            onClick={logIn}
          />
        ) : (
          <input
            className={`login__form_submit ${isButtonDisabled ? 'temp-disabled' : ''}`}
            type="submit"
            value={dict[lang].buttons.signUp}
            disabled={!(name && login && password)}
            onClick={createUser}
          />
        )}
      </form>
      {isLogin ? (
        <p className="login__suggestion">
          {dict[lang].loginPage.signInSuggestion}
          <NavLink className="login__link" to="/registration">
            <span className="reg-underline">{dict[lang].buttons.signUp}!</span>
          </NavLink>
        </p>
      ) : (
        <p className="login__suggestion">
          {dict[lang].loginPage.signInHeader}
          <NavLink className="login__link" to="/login">
            <span className="reg-underline">{dict[lang].buttons.signIn}!</span>
          </NavLink>
        </p>
      )}
    </div>
  );
}

export default LoginPage;
