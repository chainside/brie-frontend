import { dashboardMachine } from "./dasboard/dashboard.stm";
import { detailDossierMachine } from "./detailDossier/detailsDossier.stm";
import { createDossierMachine } from "./dossier/createDossierMachine.stm";
import { dossierMachine } from "./dossier/dossier.stm";
import { loginMachine } from "./login/login.stm";
import { loginCallerMachine } from "./login/loginCallerMachine.stm";
export const stateMachines = [
    loginMachine,
    loginCallerMachine,
    dossierMachine,
    createDossierMachine,
    detailDossierMachine,
    dashboardMachine
]