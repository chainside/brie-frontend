import css from "../DossierStepper.module.css"
import React from 'react';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import { StepIconProps } from '@mui/material/StepIcon';
import classnames from 'classnames'
import { useSelector } from "react-redux";
import { maxPage } from "../../../store/stms/dossier/dossier.selector";

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        })
    }),
);

export function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className, icon } = props;
    const currentMaxPage = useSelector(maxPage)
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed || (Number(icon) - 1 < currentMaxPage) ? (
                <Check className={css["QontoStepIcon-completedIcon"]} />
            ) : (
                <div className={classnames({
                    [css["QontoStepIcon-circle-active"]]: active,
                    [css["QontoStepIcon-circle"]]: !active
                })}>
                    <div className={classnames({
                        [css["QontoStepIcon-circle-internal"]]: active,
                        [css["QontoStepIcon-circle-internal-disabled"]]: !active
                    })}>
                    </div>
                </div>
            )
            }
        </QontoStepIconRoot >
    );
}