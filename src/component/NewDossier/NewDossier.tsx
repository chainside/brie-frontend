import { useSelector } from "react-redux";
import { useStateMachine } from "../../store/stms/useStateMachine";
import css from "./NewDossier.module.css";
import React, { useMemo } from "react";
import { createDossierState } from "../../store/stms/dossier/dossier.selector";
import {
  CreateDossierMachineStates,
  createDossierMachine,
} from "../../store/stms/dossier/createDossierMachine.stm";
import { userCompany } from "../../store/stms/login/login.selector";
import { DossierStepper } from "./DossierStepper";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { NewDossierBottomBar } from "./NewDossierBottombar";
import { Step4 } from "./Steps/Step4";
import { NewDossierErrorPage } from "./NewDossierErrorPage/NewDossierErrorPage";
import { Submit } from "./Steps/Submit";

const dossierCreationMap = {
  [CreateDossierMachineStates.stepSelectCompany]: <Step1 />,
  [CreateDossierMachineStates.stepProductInfo]: <Step2 />,
  [CreateDossierMachineStates.stepDocument]: <Step3 />,
  [CreateDossierMachineStates.stepRecap]: <Step4 />,
  [CreateDossierMachineStates.submitting]: <>submitting</>,
  [CreateDossierMachineStates.submittingSuccess]: <Submit />,
  [CreateDossierMachineStates.submittingError]: <><NewDossierErrorPage /><Step4 /></>,

};

export const NewDossier = () => {
  const company = useSelector(userCompany);
  const input = useMemo(() => {
    return {
      dossier: {
        id: "",
        creationDate: "",
        amount: 0,
        company: company!,
        transfereeCompany: {
          id: "",
          name: "",
          vatNumber: "",
          codeEori: "",
          businessName: "",
          legalResidence: "",
        },
        ton: 0,
        parcels: 0,
        companyState: "",
        transfereeCompanyState: "",
      },
      companyList: [],
      maxStep: 0,
      selectedDocument: {
        id: "",
        document: new File([], ""),
        type: null,
        dossier: "",
      },
      documents: [],
      errorUpload: false,
      uploading: false
    };
  }, [company]);

  useStateMachine(createDossierMachine, input);
  const state = useSelector(createDossierState);

  return (
    <div className={css["new-dossier-background"]}>
      <div className={css["new-dossier-stepper-container"]}>
        <DossierStepper />
      </div>
      <div className={css["new-dossier-container"]}>
        {(state && dossierCreationMap[state]) ?? <></>}
      </div>

      {state !== CreateDossierMachineStates.submittingError ? (
        <div className={css["new-dossier-footer"]}>
          <NewDossierBottomBar />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
