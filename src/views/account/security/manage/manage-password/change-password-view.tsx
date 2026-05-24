"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { userSecurityService } from "@/core/services/user/userSecurity.service";
import { RootState } from "@/core/store/store";
import { useToast } from "@/hooks/use-toast";
import { WarningModal } from "@/views/auth/login-password/warning-modal";
import { useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Verify2FAModal, Verify2FAModalData } from "../../verify2fa-modal";
import { userService } from "@/core/services/user/user.service";
import { Require2FA } from "@/core/models/auth/responsemodel/required2FA.model";
import { Observable, Subject } from "rxjs";
import { RemoveUser, SetUser } from "@/core/store/reducers/user.slice";
import { useRouter } from "next/navigation";
import { RemoveSession } from "@/core/store/reducers/auth.slice";
import Link from "next/link";

const texts = {
  widthdraw:
    "In order to protect your account, withdrawals, P2P selling and payment services might be disabled for 24 hours after you change your password.",
};

export const ChangePasswordView = () => {
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [rules, setRules] = useState([
    { rule: "8 to 128 characters", check: false },
    { rule: "At least 1 number", check: false },
    { rule: "At least 1 upper case letter", check: false },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(true);

  const user = useSelector((state: RootState) => state.user.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const [verify2FAModalData, setVerify2FAModalData] =
    useState<Verify2FAModalData>();
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);

  const sendActivation = (e: any) => {
    e.preventDefault();
    userSecurityService.ChangePassword(value).then((res) => {
      if (res.success) {
        if (res.success && res.data.actionID) {
          Verify2FA("2FA Verification", "Verify", res.data).subscribe({
            next: (verifyResponse) => {
              if (verifyResponse.success) {
                userSecurityService
                  .ChangePassword(value, res.data.actionID)
                  .then((res) => {
                    if (res.success) {
                      userSecurityService.GetSecuritySettings().then((res) => {
                        if (res.success) {
                          setOpenWarning(true);
                          dispatch(RemoveUser());
                          dispatch(RemoveSession());
                        }
                        setOpenVerify2FAModal(false);
                      });
                    } else {
                      console.log(
                        "Güvenlik ayarları güncellemesi başarısız",
                        res
                      );
                    }
                  });
              } else {
                console.log("2FA doğrulaması başarısız", verifyResponse);
              }
            },
            error: (err: any) => {
              console.log("2FA doğrulaması hatası", err);
            },
            complete: () => {},
          });
        }
      } else {
        toast?.open(res.messageList[0].message, "check-circle", "", "text-red");
      }
    });
  };

  const Verify2FA = (
    modalTitle: string,
    buttonTitle: string,
    require2FA: Require2FA
  ): Observable<any> => {
    const resultSubject = new Subject<any>();

    const modalData: Verify2FAModalData = {
      title: modalTitle,
      description: require2FA.description,
      InputPlaceHolder: require2FA.require2FAType,
      InputAction: () => {},
      SubmitTitle: buttonTitle,
      SubmitAction: (code) => {
        userService
          .verify2fa(require2FA.actionID, require2FA.require2FAType, code)
          .then((res) => {
            if (res.success) {
              if (res.data.require2FA.required2FA) {
                // Eğer 2FA gerekli ise aynı işlemi tekrar çağır
                return Verify2FA(
                  modalTitle,
                  buttonTitle,
                  res.data.require2FA
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
          .catch((err) => resultSubject.error(err));
      },
      otherActions: [],
      InputActionButtonTitle: "Get Code",
      InputType: "text",
    };

    setVerify2FAModalData(modalData);
    setOpenVerify2FAModal(true);

    return resultSubject.asObservable();
  };

  const ShowButton = () => {
    return (
      <div
        className="absolute right-2 top-[14px] cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        <Icon
          name={isShow ? "eye-on" : "eye-off"}
          size={20}
          className="text-gray-100 dark:text-gray-500"
        />
      </div>
    );
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value.length > 7 && value.length < 129) {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 0 ? { rule: item.rule, check: true } : item
        )
      );
    } else {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 0 ? { rule: item.rule, check: false } : item
        )
      );
    }

    if (/[A-Z]/.test(value)) {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 2 ? { rule: item.rule, check: true } : item
        )
      );
    } else {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 2 ? { rule: item.rule, check: false } : item
        )
      );
    }

    if (/[0-9]/.test(value)) {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 1 ? { rule: item.rule, check: true } : item
        )
      );
    } else {
      setRules((rules) =>
        rules.map((item, index) =>
          index === 1 ? { rule: item.rule, check: false } : item
        )
      );
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setIsButtonDisabled(false);
      setIsSubmit(true);
    } else {
      setIsButtonDisabled(true);
      setIsSubmit(false);
    }
  }, [value]);

  const handleSubmit = (e: any) => {
    if (isSubmit) {
      sendActivation(e);
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="md:px-0 px-4 sm:h-[72px] sm:min-h-[72px] w-full max-w-[1280px] h-[56px] flex mx-auto">
        <Link
          className="text-black-300 hover:text-white-100 flex items-center"
          href="/me/security"
        >
          <Icon name="chevron-left" className="mr-1" size={20} />
          Security
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100">
          Change Password
        </div>
      </div>
      <div className="x-full sm:w-[425px] sm:mx-auto mx-4">
        <div className="sm:mt-8 mt-2 p-3 flex rounded-xl text-black-200 dark:text-white-100 gap-0.5 bg-background-1100 sm:text-sm sm:leading-[22px] text-xs leading-[18px]">
          <Icon
            name="payment-warning"
            className="text-black dark:text-white-100"
            size={20}
          />
          <div className="flex-1">{texts.widthdraw}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 text-sm leading-[22px] mt-4">
            <label
              htmlFor="confirm-password"
              className="text-gray md:text-black-100 md:dark:text-white-100 font-medium"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={isShow ? "text" : "password"}
                className="pt-0.5 px-2.5 h-12 rounded-[10px]"
                value={value}
                onChange={handleChange}
                error={formError}
                isPassword
              />
              <ShowButton />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {rules.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-200 text-xs md:text-sm font-normal dark:text-gray"
              >
                <Icon
                  name="check"
                  size={16}
                  className={twMerge(
                    "text-gray-100 dark:text-gray",
                    item.check && "!text-success"
                  )}
                />
                {item.rule}
              </div>
            ))}
          </div>
          <Button
            type="submit"
            appearance="primary"
            className={twMerge(
              "mt-6 h-12 w-full rounded-[10px]",
              isButtonDisabled && "cursor-not-allowed opacity-30"
            )}
          >
            Confirm
          </Button>
        </form>
      </div>

      <Modal
        className="md:w-[360px] md:max-w-[80vw] w-full"
        open={open}
        setOpen={setOpen}
        isMobileOpen={true}
      >
        <div className="flex flex-col items-center">
          <Icon name="trash-image" className="" size={96} />
          <div className="text-center md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 font-semibold">
            Account Restrictions
          </div>
          <div className="text-black-100 dark:text-white-100 text-sm text-center">
            In order to protect your account, withdrawals, P2P selling and
            payment services might be disabled for 24 hours after you change
            your password.
          </div>
          <div className="flex items-center w-full gap-2">
            <Button
              appearance="secondary"
              className="dark:bg-background-400 bg-white-100 dark:!text-white-100 !text-black-100  opacity-80 w-full h-10 flex items-center justify-center rounded-xl font-normak mt-6"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              className="w-full h-10 flex items-center justify-center rounded-xl font-normal mt-6"
              onClick={() => setOpen(false)}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      <WarningModal
        open={openWarning}
        setOpen={setOpenWarning}
        icon="password-changed"
        title="Password Changed"
        textClass="text-sm font-normal text-center"
        titleClass="mb-4 font-medium"
        description="Your password has been successfully changed. Please log in with the new password."
        className="pt-4 pr-6 pb-6"
        iconClass="order-[-1]"
        buttonText="Log In"
        onClick={() => router.push("/")}
      />

      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          console.log(open);
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>
    </>
  );
};
