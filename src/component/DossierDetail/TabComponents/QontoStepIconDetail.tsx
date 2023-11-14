import css from "./QontoStepIconDetail.module.css"
import React from 'react';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import { StepIconProps } from '@mui/material/StepIcon';
import { Typography } from "@mui/material";
import classnames from 'classnames'

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
    }),
);

export function QontoStepIconDetail(props: StepIconProps) {
    const { active, completed, className, icon } = props;
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <div className={css["QontoStepIcon-completedIcon-container"]} >
                    <Check className={css["QontoStepIcon-completedIcon"]} />
                </div>
            ) : (
                <div className={classnames({
                    [css["QontoStepIcon-circle-active"]]: active,
                    [css["QontoStepIcon-circle"]]: !active
                })}>
                    <Typography variant={"subtitle1"} color={"#DEE1F9"}>{icon}</Typography>
                </div>
            )
            }
        </QontoStepIconRoot >
    );
}