import { combineReducers } from "redux";
import { loginMachine } from "./login/login.stm";
import { loginCallerMachine } from "./login/loginCallerMachine.stm";
import { createDossierMachine } from "./dossier/createDossierMachine.stm";
import { dossierMachine } from "./dossier/dossier.stm";
import { detailDossierMachine } from "./detailDossier/detailsDossier.stm";
import { dashboardMachine } from "./dasboard/dashboard.stm";


export const rootReducer = combineReducers({
    login: loginMachine.stateReducer,
    loginCaller: loginCallerMachine.stateReducer,
    dossier: dossierMachine.stateReducer,
    createDossier: createDossierMachine.stateReducer,
    detailDossier: detailDossierMachine.stateReducer,
    dashboard: dashboardMachine.stateReducer
});

