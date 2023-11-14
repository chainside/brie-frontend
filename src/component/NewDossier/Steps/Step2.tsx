import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import css from "./Steps.module.css";
import React, { useMemo } from "react";
import { validCategoriesMap } from "../../../types/types";
import { useCreateDossier } from "../../../store/stms/dossier/dossier.hook";
import { codeTranslator, getEnumValue } from "../../../utils/utils";

export function Step2() {
  const { changeCategory, changeTon, changeAmount, changeParcels, dossier } =
    useCreateDossier();
  const doganaCompany = useMemo(
    () => codeTranslator(dossier?.company.legalResidence.split(",")[2]),
    [dossier!.company.legalResidence],
  );
  const doganaTransferee = useMemo(
    () =>
      codeTranslator(dossier?.transfereeCompany.legalResidence.split(",")[2]),
    [dossier!.transfereeCompany.legalResidence],
  );
  return (
    <div className={css["step-main-panel"]}>
      <div className={css["step-header"]}>
        <Typography variant="h4" color={"#C2C5DD"}>
          Tipologia e destinazione merci
        </Typography>
        <Typography variant="subtitle1" color={"#C6C5D0"}>
          Fornire i dettagli delle merci oggetto di immissione in libera
          pratica.
        </Typography>
      </div>
      <div className={css["step-label-section-container"]}>
        <Typography variant="h6" color={"#C2C5DD"}>
          a. Istituzioni di controllo per lo scambio commerciale della paese
          dell’entrata e destinazione
        </Typography>
        <div className={css["step-label-row"]}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Dogana paese dell’entrata dell’UE
            </InputLabel>
            <OutlinedInput
              label="Dogana paese dell’entrata dell’UE"
              disabled={true}
              value={doganaCompany}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Dogana paese cessionario dell’UE
            </InputLabel>
            <OutlinedInput
              label="Dogana paese cessionario dell’UE"
              disabled={true}
              value={doganaTransferee}
            />
          </FormControl>
        </div>
      </div>
      <div className={css["step-label-section-container"]}>
        <Typography variant="h6" color={"#C2C5DD"}>
          b. Dati dei beni per lo scambio commerciale
        </Typography>
        <div className={css["step-label-row"]}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Tipologia merci
            </InputLabel>
            <Select
              label={"Tipologia merci"}
              value={dossier?.category}
              onChange={changeCategory}
              MenuProps={{
                PaperProps: {
                  className: css["select-type-menu"],
                  // @ts-ignore
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                  },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                  },

                },



              }}
            >
              {Object.keys(validCategoriesMap).map((item: string) => (
                <MenuItem key={item} value={item}>
                  {getEnumValue(validCategoriesMap, item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Valore, EURO
            </InputLabel>
            <OutlinedInput
              label="Valore, EURO"
              onChange={changeAmount}
              value={dossier?.amount === 0 ? "" : String(dossier?.amount)}
            />
          </FormControl>
        </div>
        <div className={css["step-label-row"]}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Peso, tonn
            </InputLabel>
            <OutlinedInput
              label="Peso, tonn"
              onChange={changeTon}
              value={dossier?.ton === 0 ? "" : String(dossier?.ton)}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Quantità, colli
            </InputLabel>
            <OutlinedInput
              label="Quantità, colli"
              onChange={changeParcels}
              value={dossier?.parcels === 0 ? "" : String(dossier?.parcels)}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
