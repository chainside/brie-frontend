export enum ValidLegalForms {
  SRL = "SRL",
  SSRL = "SSRL",
  SPA = "SPA",
  SAPA = "SAPA",
}

export const validLegalFormsMap = {
  [ValidLegalForms.SRL]: "srl",
  [ValidLegalForms.SSRL]: "ssrl",
  [ValidLegalForms.SPA]: "spa",
  [ValidLegalForms.SAPA]: "sapa"
};


export enum ValidCommoditiesSector {
  ORES_METALS_CHEMICALS = "ORES_METALS_CHEMICALS",
  ELECTRON_INFO_TECH = "ELECTRON_INFO_TECH",
  COMM_EQUIP = "COMM_EQUIP",
  COMP_CONTROL_EQUIP = "COMP_CONTROL_EQUIP",
  PRECISION_EQUIP = "PRECISION_EQUIP",
  MECHIANICAL_APPARATUS = "MECHIANICAL_APPARATUS",
  TRANSPORT_EQUIP = "TRANSPORT_EQUIP",
  MISCIELLANEOUS_ITEMS = "MISCIELLANEOUS_ITEMS",
  TEXTILES_TEXT_ART = "TEXTILES_TEXT_ART",
  CHEMICAL_PRODS = "CHEMICAL_PRODS",
  AGRICULTURAL_PRODS = "AGRICULTURAL_PRODS",
  OTHER_CATS = "OTHER_CATS",
}

export const validCommoditiesSectorMap = {
  [ValidCommoditiesSector.ORES_METALS_CHEMICALS]: "ores, metals and chemicals",
  [ValidCommoditiesSector.ELECTRON_INFO_TECH]: "electron and information technology",
  [ValidCommoditiesSector.COMM_EQUIP]: "communication equipment",
  [ValidCommoditiesSector.COMP_CONTROL_EQUIP]: "components and control equipments",
  [ValidCommoditiesSector.PRECISION_EQUIP]: "precision equipment",
  [ValidCommoditiesSector.MECHIANICAL_APPARATUS]: "mechanical/electrical apparatus",
  [ValidCommoditiesSector.TRANSPORT_EQUIP]: "transport equipment",
  [ValidCommoditiesSector.MISCIELLANEOUS_ITEMS]: "msciellaneous items",
  [ValidCommoditiesSector.TEXTILES_TEXT_ART]: "textiles and textile articles",
  [ValidCommoditiesSector.CHEMICAL_PRODS]: "chemical products",
  [ValidCommoditiesSector.AGRICULTURAL_PRODS]: "agricultural products",
  [ValidCommoditiesSector.OTHER_CATS]: "other category",

};

export enum StateLabelEnum {
  INT_REQ = "INT_REQ",
  TRANSPORT = "TRANSPORT",
  WAIT_APPR = "WAIT_APPR",
  CLOSE = "CLOSE",
  WAIT_JUST = "WAIT_JUST",
  CLEARED = "CLEARED",
  AMEND_REQ = "AMEND_REQ",
  NOT_NOTARIZED = "NOT_NOTARIZED",
  NOTARIZED = "NOTARIZED",
  FAILED = "FAILED"
}

export const stateLabelMap = {
  [StateLabelEnum.INT_REQ]: "INTEGRAZIONE RICHIESTA",
  [StateLabelEnum.TRANSPORT]: "TRASPORTO IN CORSO",
  [StateLabelEnum.WAIT_APPR]: "ATTESA APPROVAZIONE",
  [StateLabelEnum.CLOSE]: "PRATICA CONCLUSA",
  [StateLabelEnum.WAIT_JUST]: "ATTESA GIUSTIFICATIVO",
  [StateLabelEnum.CLEARED]: "MERCI SDOGANATE",
  [StateLabelEnum.AMEND_REQ]: "RETTIFICA RICHIESTA",
  [StateLabelEnum.NOT_NOTARIZED]: "DA NOTARIZZARE",
  [StateLabelEnum.NOTARIZED]: "NOTARIZZATO",
  [StateLabelEnum.FAILED]: "NON NOTARIZZATO"
};

export enum PhaseLabelEnum {
  START = "START",
  TRANSIT = "TRANSIT",
  DELIVERED = "DELIVERED",
  CLOSE = "CLOSE",
}

export const phaseLabelMap = {
  [PhaseLabelEnum.START]: "Pratica avviata",
  [PhaseLabelEnum.TRANSIT]: "Merce in transito",
  [PhaseLabelEnum.DELIVERED]: "Merce consegnata",
  [PhaseLabelEnum.CLOSE]: "Chiusura pratica",
};

export enum PhaseNumberEnum {
  START = "1",
  TRANSIT = "2",
  DELIVERED = "3",
  CLOSE = "4",
}

export enum ValidTransports {
  PLANE = "PLANE",
  INTERMODAL = "INTERMODAL",
  TRAIN = "TRAIN",
  ROAD = "ROAD",
  SEA = "SEA",
}

export const validTransportsMap: Record<string, string> = {
  [ValidTransports.PLANE]: "Aereo",
  [ValidTransports.INTERMODAL]: "Intermodale",
  [ValidTransports.TRAIN]: "Ferroviario",
  [ValidTransports.ROAD]: "Stradale",
  [ValidTransports.SEA]: "Marittimo",

};

export enum ValidCategories {
  MIN_METAL_CHEMICAL = "MIN_METAL_CHEMICAL",
  APP_COMUNICATION = "APP_COMUNICATION",
  APP_CONTROL = "APP_CONTROL",
  APP_PRECISION = "APP_PRECISION",
  APP_ELECTR_MECH = "APP_ELECTR_MECH",
  EQUIP_TRANSPORT = "EQUIP_TRANSPORT",
  MIXED_ART = "MIXED_ART",
  TEXTILE_MAT = "TEXTILE_MAT",
  CHEMICAL_PROD = "CHEMICAL_PROD",
  AGRI_PROD = "AGRI_PROD",
  OTHER = "OTHER",
}
export const validCategoriesMap = {
  [ValidCategories.MIN_METAL_CHEMICAL]: "Minerali, metalli e prodotti chimici",
  [ValidCategories.APP_COMUNICATION]: "App. per la comunicazione",
  [ValidCategories.APP_CONTROL]: "App. di controllo e componenti",
  [ValidCategories.APP_PRECISION]: "App. di precisione",
  [ValidCategories.APP_ELECTR_MECH]: "Elettronica e Informatica",
  [ValidCategories.EQUIP_TRANSPORT]: "Attrezzature per trasporto",
  [ValidCategories.MIXED_ART]: "Articoli misti",
  [ValidCategories.TEXTILE_MAT]: "Materiali tessili",
  [ValidCategories.CHEMICAL_PROD]: "Prodotti chimici",
  [ValidCategories.AGRI_PROD]: "Prodotti agricoli",
  [ValidCategories.OTHER]: "Altre categorie",
}

export const StepDossierCreation = [
  "stepSelectCompany",
  "stepProductInfo",
  "stepDocument",
  "stepRecap",
  "submitting",
];

const Month = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];

const LongMonth = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export function formatTime(date: Date, long?: boolean) {
  if (long) {
    return (
      date.getDate() +
      " " +
      LongMonth[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  } else {
    return (
      date.getDate() + " " + Month[date.getMonth()] + " " + date.getFullYear()
    );
  }
}

export function showDate(date?: string) {
  if (date) {
    const formattedDate = new Date(date);
    return formatTime(formattedDate);
  } else {
    return "-";
  }
}

export function showDateTime(date?: string) {
  if (date) {
    const formattedDate = new Date(date);
    return (
      formattedDate.getHours() +
      ":" +
      formattedDate.getMinutes() +
      ":" +
      formattedDate.getSeconds()
    );
  } else {
    return "-";
  }
}

export function toEuro(value: number | undefined) {
  if (value) {
    return Number(value).toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR",
    });
  } else {
    return "";
  }
}

export interface FilterDossierList {
  skip: number;
  max: number;
  startCreationDate?: Date;
  endCreationDate?: Date;
  creator?: string;
  phase?: string;
  orderBy?: {
    column: string;
    direction: string;
  }
}

export interface FilterDashboard {
  startCreationDateFilter?: Date,
  endCreationDateFilter?: Date,
  entryCountry?: string,
  destinationCountry?: string
}


export enum FilterTypes {
  TIME_INTERVAL = "Intervallo",
  PHASE = "Fase pratica",
  CREATED_BY = "Create da",
  IN_COUNTRY = "Paese di ingresso",
  OUT_COUNTRY = "Paese di uscita",
}

export enum ValidRequestType {
  INT_DOCS = 'INT_DOCS',
  DDT_REQ = 'DDT_REQ',
  DELIVERED_CONFIRM = 'DELIVERED_CONFIRM',
  PAY_CONFIRM = 'PAY_CONFIRM',
  AMEND_REQ = 'AMEND_REQ',
}

export const validRequestTypeMap = {
  [ValidRequestType.INT_DOCS]: "Integrazione dei documenti",
  [ValidRequestType.DDT_REQ]: "Richiesta Documento Di Trasporto",
  [ValidRequestType.DELIVERED_CONFIRM]: "Conferma consegna merce",
  [ValidRequestType.PAY_CONFIRM]: "Conferma pagamento IVA",
  [ValidRequestType.AMEND_REQ]: "Rettifica giustificativo",
}

export enum ValidRequestDetails {
  CONF_ERR = "CONF_ERR",
  DDT_WAIT = "DDT_WAIT",
  DELIVERED = "DELIVERED",
  CALCULATE_VAT = "CALCULATE_VAT",
  NOT_CORRECT_AMOUNT = "NOT_CORRECT_AMOUNT",
}



export const validRequestDetailsMap = {
  [ValidRequestDetails.CONF_ERR]: "Errore di conformità",
  [ValidRequestDetails.DDT_WAIT]: "In attesa del caricamento del DDT",
  [ValidRequestDetails.DELIVERED]: "Merce spedita",
  [ValidRequestDetails.CALCULATE_VAT]: "IVA calcolata",
  [ValidRequestDetails.NOT_CORRECT_AMOUNT]: "Importo non corretto",

}

export const steps = [
  "Operatori economici",
  "Tipologia e destinazione merci",
  "Documenti per avvio pratica ",
  "Conferma ed invio pratica",
  "",
];

export enum locationStates {
  NEW_DOSSIER,
}

export enum ValidCompliance {
  OK = "OK",
  KO = "KO",
}

export enum DocTypes {
  BILL = "BILL",
  INVOICE = "INVOICE",
  WAYBILLS = "WAYBILLS",
  PACKAGING_LIST = "PACKAGING_LIST",
  CERTIFICATE = "CERTIFICATE",
  OTHER = "OTHER",
}

export const docTypesMap: Record<string, string> = {
  [DocTypes.BILL]: "Bolla doganale",
  [DocTypes.INVOICE]: "Fattura commerciale",
  [DocTypes.WAYBILLS]: "Lettere di vettura",
  [DocTypes.PACKAGING_LIST]: "Lista di imballaggio",
  [DocTypes.CERTIFICATE]: "Certificato d'origine",
  [DocTypes.OTHER]: "Altre tipologie",

}

export enum DocIntegration {
  DDT = "Documento di trasporto",
  VAT = "Giustificativo Pagamento",
}

export enum AllDocTypes {
  BILL = "BILL",
  INVOICE = "INVOICE",
  WAYBILLS = "WAYBILLS",
  PACKAGING_LIST = "PACKAGING_LIST",
  CERTIFICATE = "CERTIFICATE",
  OTHER = "OTHER",
  DDT = "DDT",
  VAT = "VAT",
}

export const allDocTypesMap = {
  [AllDocTypes.BILL]: "Bolla doganale",
  [AllDocTypes.INVOICE]: "Fattura commerciale",
  [AllDocTypes.WAYBILLS]: "Lettere di vettura",
  [AllDocTypes.PACKAGING_LIST]: "Lista di imballaggio",
  [AllDocTypes.CERTIFICATE]: "Certificato d'origine",
  [AllDocTypes.OTHER]: "Altre tipologie",
  [AllDocTypes.DDT]: "Documento di trasporto",
  [AllDocTypes.VAT]: "Giustificativo Pagamento",

}
