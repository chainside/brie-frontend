import {
  DetailDossierStates,
  detailDossierMachine,
} from "../../store/stms/detailDossier/detailsDossier.stm";
import { DossierDetail } from "./DossierDetail";
import { showBottomBarSelector } from "../../store/stms/detailDossier/detailsDossier.selector";
import { useStateMachine } from "../../store/stms/useStateMachine";
import { useParams } from "react-router-dom";
import React from "react";
import { Pages } from "../MainPanel/Pages";
import { FormDdt } from "./TabComponents/ActionComponents/FormDdt/FormDdt";
import css from "./DossierDetail.module.css";
import classnames from "classnames";
import { useDetailsDossier } from "../../store/stms/detailDossier/detailsDossier.hook";
import { DetailDossierBottomBar } from "./TabComponents/DetailDossierBottomBar/DetailDossierBottomBar";
import { useSelector } from "react-redux";
import { FormComplianceRequest } from "./TabComponents/ActionComponents/FormComplianceRequest/FormComplianceRequest";
import { FormVatPayment } from "./TabComponents/ActionComponents/FormVatPayment/FormVatNumber";
import { getEnumValue } from "../../utils/utils";
import { GenericErrorPage } from "../Login/GenericErrorPage/GenericErrorPage";
import { DocumentIntegration } from "./TabComponents/ActionComponents/DocumentIntegration/DocumentIntegration";

const dossierDetailMap = {
  [DetailDossierStates.loadDetail]: <></>,
  [DetailDossierStates.failed]: <><GenericErrorPage retrySelector={Pages.prd4Details} /><DossierDetail /></>,
  [DetailDossierStates.showDetail]: <DossierDetail />,
  [DetailDossierStates.showDDT]: <FormDdt />,
  [DetailDossierStates.showCompliance]: <FormComplianceRequest />,
  [DetailDossierStates.showVAT]: <FormVatPayment />,
  [DetailDossierStates.docsIntegration]: <DocumentIntegration />,
  [DetailDossierStates.submitting]: <>submitting</>,
};

export const DossierDetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  useStateMachine(detailDossierMachine, {
    dossier: {
      id: "",
      creationDate: "",
      amount: 0,
      company: {
        id: "",
        name: "",
        vatNumber: "",
        codeEori: "",
        businessName: "",
        legalResidence: "",
      },
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
      customsClearaceDate: "",
    },
    dossierId: id ?? "",
    documents: [],
    errorUpload: false,
    uploading: false,
    completedAction: false
  });
  const { detailDossierState } = useDetailsDossier();
  const showBottomBar = useSelector(showBottomBarSelector);
  return (
    <div
      className={classnames({
        [css["action-background"]]:
          getEnumValue(DetailDossierStates, detailDossierState as string) ===
          DetailDossierStates.showDDT ||
          getEnumValue(DetailDossierStates, detailDossierState as string) ===
          DetailDossierStates.showCompliance ||
          getEnumValue(DetailDossierStates, detailDossierState as string) ===
          DetailDossierStates.showVAT ||
          getEnumValue(DetailDossierStates, detailDossierState as string) ===
          DetailDossierStates.docsIntegration,
        [css["action-background-overflow"]]: true,
      })}
    >
      <div className={classnames({ [css["container"]]: showBottomBar })}>
        {(detailDossierState && dossierDetailMap[detailDossierState]) ?? <></>}
      </div>
      {
        showBottomBar ? (
          <div className={css["dossier-footer"]}>
            <DetailDossierBottomBar />
          </div>
        ) : (
          <></>
        )
      }
    </div >
  );
};
