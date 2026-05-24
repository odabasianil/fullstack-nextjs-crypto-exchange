export interface API {
  apiKeyId: number;
  alias?: string;
  apiSecret?: string;
  permissions?: string;
  createdDate: string;
  lastUsedData: string;
  require2FA: {
    required2FA: boolean;
    actionID: number;
    description: string;
    require2FAType: string;
  }
}