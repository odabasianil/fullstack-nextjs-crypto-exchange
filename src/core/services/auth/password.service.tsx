import { BaseResult } from '@/core/models/auth/responsemodel/baseresult.model';
import { LoginResult } from '@/core/models/auth/responsemodel/loginresponse.model';
import { get, post } from '../webservice';
import { Verify2faResponse } from '@/core/models/auth/responsemodel/required2FA.model';
import { User } from '@/core/models/auth/models/user.model';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store/store';

export const passwordService = {
    ResetPassword,
    ChangePassword
};

function ResetPassword(email: string) {
    return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
        post(`/password/resetpassword`, { email })
          .then((res: BaseResult<LoginResult>) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
}

function ChangePassword(actionID: number, newPassword: string) {
  return new Promise<BaseResult<Verify2faResponse>>((resolve, reject) => {
      post(`/password/changepassword`, {actionID, newPassword})
        .then((res: BaseResult<Verify2faResponse>) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
}