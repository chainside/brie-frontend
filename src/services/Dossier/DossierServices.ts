import { ComplianceForm, DdtForm, DocIntegrationForm, DocumentInterface, DossierCreateInterface, GET_DOSSIER_DETAIL, VatForm } from "./api";
import axiosInstance from "../axiosConfig";
import { FilterDossierList } from "../../types/types";



const GET_COMPANIES = {
    path: "company/findByBusinessName",
    method: "GET"
};


const GET_DOCUMENTS = {
    path: "document",
    method: "GET"
};

const DOWNLOAD_DOCUMENTS = {
    path: "document/download",
    method: "GET"
};

const GET_DOSSIERS_BY_FILTER = {
    path: "dossier/findByFilters",
    method: "POST"
};


const CREATE_DOSSIER = {
    path: "dossier",
    method: "POST"
};

const SUBMIT_DDT = {
    path: "dossier/uploadDDT",
    method: "PATCH"
}

const SUBMIT_VAT = {
    path: "dossier/uploadVatCompliance",
    method: "PATCH"
}

const SUBMIT_DOC_INT = {
    path: "dossier/intDocs",
    method: "PATCH"
}

const CONFIRM_DELIVERED = {
    path: "dossier/confirmDelivered",
    method: "PATCH"
}

const UPLOAD_DOC = {
    path: "document-draft",
    method: "POST"
}

export const uploadDoc = async (requestBody: DocumentInterface) => {
    const api = UPLOAD_DOC.path;
    const formData = new FormData();
    formData.append('file', requestBody.document)
    formData.append('type', requestBody.type!)

    return await axiosInstance(api, {
        withCredentials: true,
        method: UPLOAD_DOC.method,
        headers: {
            'Content-Type': `multipart/form-data;`,
        },
        data: formData,
    }).then((res) => {
        return { id: res.data }
    }).catch(() => {
        return null;
    });
}

export const getCompanies = async (name: string) => {
    const api = GET_COMPANIES.path;
    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_COMPANIES.method,
        params: {
            businessName: name,
            max: 20
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        return []
    });
};


export const getDossiersByFilter = async (filter: FilterDossierList) => {
    const api = GET_DOSSIERS_BY_FILTER.path;
    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_DOSSIERS_BY_FILTER.method,
        data: filter
    }).then((res) => {
        return res.data;
    }).catch((res) => {
        return { data: { statusCode: res.response.data.statusCode } };
    });
};

export const createDossier = async (requestBody: DossierCreateInterface) => {
    const api = CREATE_DOSSIER.path;
    return await axiosInstance(api, {
        withCredentials: true,
        method: CREATE_DOSSIER.method,
        data: { ...requestBody },
    }).then((res) => {
        return { dossier: res.data }
    }).catch(() => {
        return null;
    });
};


export const getDossierDetail = async (id: string) => {
    const api = GET_DOSSIER_DETAIL.path + "/" + id;
    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_DOSSIER_DETAIL.method,
    }).then((res) => {
        return res.data
    })
        .catch((res) => {
            return { data: { statusCode: res.response.data.statusCode } };
        });
};

export const submitDdt = async (requestBody: DdtForm) => {
    const api = SUBMIT_DDT.path
    return await axiosInstance(api, {
        withCredentials: true,
        method: SUBMIT_DDT.method,
        data: { ...requestBody },
    }).then((res) => {
        return res.data
    })
        .catch(() => {
            return null
        });
};

export const submitVat = async (requestBody: VatForm) => {
    const api = SUBMIT_VAT.path
    return await axiosInstance(api, {
        withCredentials: true,
        method: SUBMIT_VAT.method,
        data: { ...requestBody },
    }).then((res) => {
        return res.data
    })
        .catch(() => {
            return null
        });
};

export const submitDocIntegration = async (requestBody: DocIntegrationForm) => {
    const api = SUBMIT_DOC_INT.path
    return await axiosInstance(api, {
        withCredentials: true,
        method: SUBMIT_DOC_INT.method,
        data: { ...requestBody },
    }).then((res) => {
        return res.data
    })
        .catch(() => {
            return null
        });
};

export const confirmDelivered = async (requestBody: ComplianceForm) => {
    const api = CONFIRM_DELIVERED.path
    return await axiosInstance(api, {
        withCredentials: true,
        method: CONFIRM_DELIVERED.method,
        data: { ...requestBody },
    }).then((res) => {
        return res.data
    })
        .catch(() => {
            return null
        });
};

export const getDocuments = async (id: string) => {
    const api = GET_DOCUMENTS.path + "/" + id;
    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_DOCUMENTS.method,
    }).then((res) => {
        return res.data
    })
        .catch((res) => {
            return { data: { statusCode: res.response.data.statusCode } };
        });
};

export const downloadDocument = async (id: string) => {
    const api = process.env.REACT_APP_API_BASE_URL +"/api/v1/"+ DOWNLOAD_DOCUMENTS.path + "/" + id;
    const link = document.createElement('a');
    link.href = api;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    link.click();
};
