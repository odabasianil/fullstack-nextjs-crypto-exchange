
export interface Require2FA {
    required2FA: boolean;
    actionID: number;
    description: string;
    require2FAType: string;
}

export interface Verify2faResponse {
    require2FA: Require2FA;
}