import { userService } from "@/core/services/user/user.service";
import { Require2FA } from "@/core/models/auth/responsemodel/required2FA.model";
import { Observable, Subject } from "rxjs";
import { Verify2FAModalData } from "@/views/account/security/verify2fa-modal";

export const Verify2FA = (
  modalTitle: string,
  buttonTitle: string,
  require2FA: Require2FA,
  setOpenVerifyModal?: any,
  setVerifyModalData?: any
): Observable<any> => {
  const resultSubject = new Subject<any>();

  const modalData: Verify2FAModalData = {
    title: modalTitle,
    description: require2FA.description,
    InputPlaceHolder: require2FA.require2FAType,
    InputAction: () => { },
    SubmitTitle: buttonTitle,
    SubmitAction: (code, setIsLoading) => {
      setIsLoading(true);
      userService
        .verify2fa(require2FA.actionID, require2FA.require2FAType, code)
        .then((res) => {
          if (res.success) {
            if (res.data.require2FA.required2FA) {
              // Eğer 2FA gerekli ise aynı işlemi tekrar çağır
              return Verify2FA(
                modalTitle,
                buttonTitle,
                res.data.require2FA,
                setOpenVerifyModal,
                setVerifyModalData
              ).subscribe({
                next: (response: any) => resultSubject.next(response),
                error: (err: any) => resultSubject.error(err),
              });
            } else {
              resultSubject.next(res);
              resultSubject.complete();
            }
          } else {
            resultSubject.error("Verification failed");
          }
        })
        .catch((err) => resultSubject.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    },
    otherActions: [],
    InputActionButtonTitle: "Get Code",
    InputType: "text",
  };

  setVerifyModalData(modalData);
  setOpenVerifyModal(true);

  return resultSubject.asObservable();
};