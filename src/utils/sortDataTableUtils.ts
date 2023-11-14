import { DossierInterface } from "../services/Dossier/api";
import { PhaseNumberEnum, formatTime, phaseLabelMap, toEuro, validCategoriesMap } from "../types/types";
import { codeTranslator, getEnumValue } from "./utils";

interface DossierColumn {
  id: DossierColumnNames;
  label: string;
  minWidth?: number;
  align?: "left";
  format?: string | number;
}

export enum DossierColumnNames {
  id = "id",
  company = "company",
  transfereeCompany = "transfereeCompany",
  category = "category",
  phase = "phase",
  state = "state",
}

export const sortableColumns: readonly DossierColumn[] = [
  { id: DossierColumnNames.id, label: "Id\u00a0pratica", minWidth: 100 },
  { id: DossierColumnNames.company, label: "Creata\u00a0da", minWidth: 100 },
  {
    id: DossierColumnNames.transfereeCompany,
    label: "Cessionario",
    minWidth: 100,
  },

];

export const columns: readonly DossierColumn[] = [
  {
    id: DossierColumnNames.category,
    label: "Tipologia\u00a0merci",
    minWidth: 100,
  },
  { id: DossierColumnNames.phase, label: "Fase", minWidth: 100 },
  { id: DossierColumnNames.state, label: "Stato", minWidth: 150 },

];


export const getSubInfoFromDossier = (
  column: DossierColumnNames,
  item: DossierInterface,
) => {
  switch (column) {
    case "id":
      return "Creata il " + formatTime(new Date(item.creationDate));
    case "company":
      return codeTranslator(item.company.legalResidence.split(",")[2]);
    case "transfereeCompany":
      return codeTranslator(
        item.transfereeCompany.legalResidence.split(",")[2],
      );
    case "category":
      return toEuro(Number(item.amount));
    case "phase":
      return "Fase " + getEnumValue(PhaseNumberEnum, item.phase) + " di 4";
    default:
      return "";
  }
};

export const getInfoFromDossier = (
  column: DossierColumnNames,
  value: DossierInterface,
) => {
  switch (column) {
    case "id":
      return value.id.substring(0, 6);
    case "company":
      return value.company.businessName;
    case "transfereeCompany":
      return value.transfereeCompany.businessName;
    case "category":
      return validCategoriesMap[value.category!];
    case "phase":
      return phaseLabelMap[value.phase!];
    default:
      return "";
  }
};

export type Order = "asc" | "desc";

