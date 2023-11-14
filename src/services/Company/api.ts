import { ValidCommoditiesSector, ValidLegalForms } from "../../types/types";

export interface Company {
    id: string,
    name: string,
    vatNumber: string,
    codeEori: string,
    businessName: string,
    legalForm?: ValidLegalForms,
    legalResidence: string,
    commoditiesSector?: ValidCommoditiesSector
}

