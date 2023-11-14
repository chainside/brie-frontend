
import { Stepper, Step, StepLabel, StepButton } from "@mui/material"
import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { createDossierState, maxPage } from "../../store/stms/dossier/dossier.selector";
import { StepDossierCreation, steps } from "../../types/types";
import { useCreateDossier } from "../../store/stms/dossier/dossier.hook";
import { QontoStepIcon } from "./StepperComponents/QontoStepIcon";

export const DossierStepper = () => {
    const currentState = useSelector(createDossierState)
    const currentMaxPage = useSelector(maxPage)
    const { goToStep } = useCreateDossier()
    const changeStep = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const newStep = steps.indexOf(event.currentTarget.getAttribute("id")!)
        if (newStep !== 2) {
            goToStep(newStep)
        }

    }, [currentState])

    return (
        <Stepper activeStep={StepDossierCreation.indexOf(currentState!)} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}
                    active={steps.indexOf(label!) <= currentMaxPage}
                    disabled={steps.indexOf(label!) > currentMaxPage} >
                    <StepButton
                        id={label}
                        key={label}
                        onClick={changeStep} >
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    )
}

