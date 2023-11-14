import { Chip } from "@mui/material";
import { StateLabelEnum, stateLabelMap } from "../../../types/types";
import css from "./StateLabel.module.css";
import React from "react";

interface Props {
  state?: StateLabelEnum;
}

export const StateLabel = (props: Props) => {
  const getChipType = (
    event: StateLabelEnum,
  ):
    | "error"
    | "warning"
    | "primary"
    | "default"
    | "secondary"
    | "info"
    | "success" => {
    switch (event) {
      case StateLabelEnum.INT_REQ:
        return "error";
      case StateLabelEnum.TRANSPORT:
        return "warning";
      case StateLabelEnum.WAIT_APPR:
        return "warning";
      case StateLabelEnum.WAIT_JUST:
        return "warning";
      case StateLabelEnum.CLOSE:
        return "primary";
      case StateLabelEnum.CLEARED:
        return "primary";
      case StateLabelEnum.NOTARIZED:
        return "success";
      case StateLabelEnum.NOT_NOTARIZED:
        return "secondary";
      case StateLabelEnum.FAILED:
        return "error";
      default:
        return "error";
    }
  };

  if(!props.state){
    return <></>
  }

  return (
    <div className={css["state-label"]}>
      <Chip
        color={getChipType(props.state)}
        label={stateLabelMap[props.state]}
      />
    </div>
  );
};
