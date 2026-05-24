export interface UserProfile {
    profileImage: string;
    dateOfBirth: string;
    address: string;
    city: string;
    country: string;
}

export interface User {
    userID: number;
    vipLevel: string;
    accountType: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isGoogleVerified: boolean;
    lastLoginDate: string;
    createDate: string;
    language: string;
    fiatCurrency: string;
    sessionTimeOut: number;
    require2FA: boolean | null;
    userRoles: string[] | null;
    profile: UserProfile;
}