import { Require2FA } from "./required2FA.model";

export interface LoginResult {
    userID: number;
    sessionID: number;
    sessionToken: string;
    require2FA: Require2FA;
    roleList: any;
}
