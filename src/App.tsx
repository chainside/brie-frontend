import css from './App.module.css';
import "./index.css";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/400-italic.css";
import { loginState } from './store/stms/login/login.selector';
import React from 'react';
import { MainPanel } from './component/MainPanel/MainPanel';
import { LoginStates } from './store/stms/login/login.stm';
import { LoginErrorPage } from './component/Login/LoginErrorPage/LoginErrorPage';
import { Login } from './component/Login/Login';
import { useSelector } from 'react-redux';



const loginMap = {
  [LoginStates.notLogged]: <Login />,
  [LoginStates.logged]: <MainPanel />,
  [LoginStates.starting]: <div>starting</div>,
  [LoginStates.serverError]: <LoginErrorPage />,
  [LoginStates.userLoggingOut]: < div> logging out</div>,
  [LoginStates.genericServerError]: <LoginErrorPage />,
}


function App() {
  const state = useSelector(loginState);

  return (

    <div className={css["App-main-container"]}>
      {(state && loginMap[state]) ?? <></>}
    </div>

  );
}

export default App;