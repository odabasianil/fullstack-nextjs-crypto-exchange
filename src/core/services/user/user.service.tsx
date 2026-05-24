import { BaseResult } from '@/core/models/auth/responsemodel/baseresult.model';
import { LoginResult } from '@/core/models/auth/responsemodel/loginresponse.model';
import { get, post } from '../global.api.webservice';
import { Verify2faResponse } from '@/core/models/auth/responsemodel/required2FA.model';
import { User } from '@/core/models/auth/models/user.model';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store/store';

export const userService = {
  userlogin,
  verify2fa,
  logout,
  userMe,
  getUser,
  userRegister,
  updatePhone,
  updateUserInfos,
  getlanguage,
  getSessionList,
  terminateSession,
};

function userlogin(email: string, password: string) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/login`, { email, password })
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function verify2fa(actionID: number, authType: string, code: string) {
  return new Promise<BaseResult<Verify2faResponse>>((resolve, reject) => {
    post(`/user/verify2fa`, { actionID, authType, code })
      .then((res: BaseResult<Verify2faResponse>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function userMe() {
  return new Promise<BaseResult<User>>((resolve, reject) => {
    get(`/user/me`)
      .then((res: BaseResult<User>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function logout() {
  return new Promise<BaseResult<User>>((resolve, reject) => {
    post(`/user/session/logout`, {})
      .then((res: BaseResult<User>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getUser() {
  const user = useSelector((state: RootState) => state.user.user);
  return user;
}

function getlanguage() {
  const language = useSelector((state: RootState) => state.preference.language);
  return language;
}

function updatePhone(countryCode: string, phone: string, actionID?: number) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/updatephonenumber`, { countryCode, phone, actionID })
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateUserInfos({ userAlias, language, fiatCurrency }: { userAlias?: string; language?: string; fiatCurrency?: number }) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/updateUserInfo`, { userAlias, language, fiatCurrency })
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function userRegister(email: string, password: string, userAgreement: boolean, kvkk: boolean, marketing: boolean) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/register`, { email, password, userAgreement, kvkk, marketing })
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


//getSessionList
function getSessionList() {
  return new Promise<BaseResult<User>>((resolve, reject) => {
    get(`/user/session/list`)
      .then((res: BaseResult<User>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//terminateSession
function terminateSession(id: number) {
  return new Promise<BaseResult<User>>((resolve, reject) => {
    post(`/user/session/terminateSession`, { sessionId: id })
      .then((res: BaseResult<User>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}