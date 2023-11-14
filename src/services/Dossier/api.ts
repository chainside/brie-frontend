import {
  AllDocTypes,
  DocIntegration,
  DocTypes,
  PhaseLabelEnum,
  StateLabelEnum,
  ValidCategories,
  ValidRequestDetails,
  ValidRequestType,
} from "../../types/types";
import { Company } from "../Company/api";
export interface DossierInterface {
  id: string;
  creationDate: string;
  category?: ValidCategories;
  amount: number;
  company: Company;
  transfereeCompany: Company;
  phase?: PhaseLabelEnum;
  state?: StateLabelEnum;
  ton: number;
  parcels: number;
  data?: object;
  customsClearaceDate?: string;
  requestDate?: string;
  requestDetail?: ValidRequestDetails;
  requestType?: ValidRequestType;
  requester?: string;
  transportationMode?: string;
  carrierName?: string;
  carrierVAT?: string;
  pickupDate?: string;
  expectedDeliveryDate?: string;
  pickupAddress?: string;
  destinationAddress?: string;
  deliveredDate?: string;
  compliance?: string;
  note?: string;
  amountVAT?: number;
  paymentDate?: string;
  ddtApproveDate?: string;
  provider?: string;
  closingDate?: string;
}

export interface DocumentInterface {
  id: string;
  document: File;
  type: DocTypes | DocIntegration | null | string;
}

export interface DocumentDetail {
  id: string;
  name: string;
  type: AllDocTypes;
  size: number;
  phase: PhaseLabelEnum;
  uploader: Company;
  uploadDate: Date;
  state: StateLabelEnum;
  txId?: string;
  ipfsLink?: string;
}

export interface DdtForm {
  id: string;
  transportationMode: string;
  carrierName: string;
  carrierVAT: string;
  pickupDate: Date | undefined;
  expectedDeliveryDate: Date | undefined;
  pickupAddress: string;
  destinationAddress: string;
  document: string;
}

export interface VatForm {
  id: string;
  amountVAT: number;
  paymentDate: Date | undefined;
  document?: string;
}

export interface DocIntegrationForm {
  id: string;
  document: string
}

export interface ComplianceForm {
  id: string;
  deliveredDate: Date | undefined;
  compliance: string;
  note: string;
  document: string;
}

export interface DossierCreateInterface {
  category: ValidCategories;
  company: string;
  transfereeCompany: string;
  amount: number;
  ton: number;
  parcels: number;
}

export const GET_DOSSIER_DETAIL = {
  path: "dossier",
  method: "GET",
};
