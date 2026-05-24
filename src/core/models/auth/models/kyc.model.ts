export interface KYCError {
  kycUserDataId: number,
  tenantId: number,
  userId: number,
  kycTenantModuleId: number,
  kycModuleId: number,
  kycModuleFieldId: number,
  value: string,
  createDate: string,
  status: number,
  kycModuleField: {
    kycModuleFieldId: number,
    kycModuleId: number,
    fieldName: string,
    description: string,
    fieldType: number,
    isRequired: true,
    validationRule: string,
    maxLength: number,
    sortOrder: number,
    status: number,
    kycModule: {
      kycModuleId: number,
      name: string,
      status: number
    }
  },
  kycTenantModule: {
    tenantKYCModuleId: number,
    tenantId: number,
    kycModuleId: number,
    integratorId: number,
    integratorApiKey: string,
    userLevel: number,
    status: number,
    kycModule: {
      kycModuleId: number,
      name: string,
      status: number
    }
  },
  kycModule: {
    kycModuleId: number,
    name: string,
    status: number
  }
}

export interface KYCField {
  moduleFieldId: number,
  kycModuleId: number,
  fieldName: string,
  description: string,
  fieldType: number,
  isRequired: true,
  validationRule: string,
  maxLength: number,
  sortOrder: number,
  status: number,
  kycModule: {
    kycModuleId: number,
    name: string,
    status: number
  }
}

export interface KYCStatus {
  moduleID: number,
  moduleName: string,
  comment: string,
  lastUpdated: string,
  status: number,
  statusText: string,
  errors?: KYCError[]
}

export interface KYCStart {
  moduleID: number,
  moduleName: string,
  statusText: string,
  status: number,
  verificationMessage: string,
  fields?: KYCField[]
}

export interface KYCSubmitField {
  fieldId: number,
  fieldName: string,
  value: string
}

export interface KYCSubmitForm {
  kycModuleID: number,
  answers: KYCSubmitField[]
}

export interface KYCSubmitResponse {
  submissionStatus: string,
  nextStep: string,
  message: string
}