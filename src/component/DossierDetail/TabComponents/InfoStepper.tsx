import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { StartedDossier } from "./InfoStepperComponents/StartedDossier";
import { StateLabel } from "../../Dossier/StateLabel/StateLabel";
import { Divider, Typography } from "@mui/material";
import css from "../DossierDetail.module.css";
import { TransitDossier } from "./InfoStepperComponents/TransitDossier";
import { DeliveredDossier } from "./InfoStepperComponents/DeliveredDossier";
import { ClosedDossier } from "./InfoStepperComponents/ClosedDossier";
import {
  PhaseLabelEnum,
  PhaseNumberEnum,
  phaseLabelMap,
} from "../../../types/types";
import { QontoStepIconDetail } from "./QontoStepIconDetail";
import classnames from "classnames";
import { getEnumValue } from "../../../utils/utils";
import { useDetailsDossier } from "../../../store/stms/detailDossier/detailsDossier.hook";
import { useMemo } from "react";
import { CustomAlert } from "../../CustomAlert/CustomAlert";

const steps = [
  {
    label: phaseLabelMap[PhaseLabelEnum.START],
    component: <StartedDossier />,
  },
  {
    label: phaseLabelMap[PhaseLabelEnum.TRANSIT],
    component: <TransitDossier />,
  },
  {
    label: phaseLabelMap[PhaseLabelEnum.DELIVERED],
    component: <DeliveredDossier />,
  },

  {
    label: phaseLabelMap[PhaseLabelEnum.CLOSE],
    component: <ClosedDossier />,
  },
];

export const InfoStepper = () => {
  const { detailDossierInfo, showCompletedAction, removeCompletedAction } = useDetailsDossier();
  const currentPhase = useMemo(
    () => getEnumValue(PhaseNumberEnum, detailDossierInfo?.phase ?? ""),
    [],
  );

  const activeStep = useMemo(() => Number(currentPhase) - 1, []);
  return (
    <Box>
      <CustomAlert show={showCompletedAction!} onClose={removeCompletedAction}>
        <Typography variant="body2" color={"#1b1b1f"}>Richiesta inviata con successo.</Typography>
      </CustomAlert>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={css["stepper-detail"]}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            active={true}
            disabled={activeStep !== index}
            className={index > activeStep ? css["opacity"] : ""}
            completed={
              activeStep > index || detailDossierInfo?.state === "CLOSE"
            }
          >
            <StepLabel StepIconComponent={QontoStepIconDetail}>
              <div className={classnames(css["stepper-label-row"])}>
                <Typography color={"#C2C5DD"} fontSize={"14px"}>
                  {step.label}
                </Typography>
                {steps[activeStep].label === step.label ? (
                  <StateLabel state={detailDossierInfo!.state}></StateLabel>
                ) : (
                  <></>
                )}
              </div>
            </StepLabel>
            <StepContent>{step.component}</StepContent>
            {index !== steps.length - 1 && (
              <Divider className={css["dossier-detail-divider"]} />
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
