
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { subUserService } from "@/core/services/user/subuser.service";
import { useEffect, useState } from "react";
import { Verify2FAModal } from "../../security/verify2fa-modal";
import { Verify2FA } from "@/utils/verify-2fa";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

export const ChangePasswordModal = (props: any) => {
  const { open, setOpen, userId, email } = props;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<any>();
  const [rules, setRules] = useState([
    { rule: '8 ila 128 karakter', check: false },
    { rule: 'En az 1 rakam', check: false },
    { rule: 'En az 1 büyük harf', check: false },
  ]);

  const toast = useToast();

  const handle2FAVerification = (e: any, require2FAData: any, subUserId: string) => {
    Verify2FA("2FA Verification", "Verify", require2FAData, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
      next: (verifyResponse: any) => {
        if (verifyResponse.success) {
          handleSubmit(e, verifyResponse?.data?.require2FA?.actionID)
          setOpenVerify2FAModal(false);
        }
      },
      error: (err) => {
        console.error('2FA verification error:', err);
        toast?.open('2FA verification failed', 'circle-close', '', 'text-error');
      }
    });
  };

  const handleSubmit = (e: any, actionId?: number) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setFormError('Password does not match');
      return;
    }

    if (newPassword.length < 1) {
      setFormError('Lütfen şifrenizi girin')
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 128 || !newPassword.match(/[0-9]/) || !newPassword.match(/[A-Z]/)) {
      setFormError('Şifre gereksinimleri karşılanmadı.')
      return;
    }

    subUserService.changePassword(userId, newPassword, actionId).then((res) => {
      if (res.success) {
        const require2FAData = res.data;;
        if (require2FAData?.required2FA && !actionId) {
          handle2FAVerification(e, require2FAData, userId);
        } else {
          setOpenVerify2FAModal(false);
          toast?.open('Sub account has been changed password.', 'check-circle', '', 'text-success');
          setOpen(false);
          setNewPassword('');
          setConfirmPassword('');
          setFormError('');
        }
      } else {
        toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }
    })
      .catch((err) => {
        console.error('Submission error:', err);
        toast?.open(err?.response?.data?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
      });
  }

  useEffect(() => {
    if (newPassword.length > 7 && newPassword.length < 128) {
      setRules((rules) => rules.map((item, index) =>
        index === 0 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 0 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[A-Z]/.test(newPassword)) {
      setRules((rules) => rules.map((item, index) =>
        index === 2 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 2 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[0-9]/.test(newPassword)) {
      setRules((rules) => rules.map((item, index) =>
        index === 1 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 1 ? { rule: item.rule, check: false } : item
      ));
    }
  }, [newPassword])
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Change Password"
        className="md:max-w-[375px]"
        titleClass="text-xl font-semibold"
        showCloseButton
        isMobileOpen
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <div className="text-xs mb-1">Email</div>
              <Input
                value={email}
                className="h-[38px] !rounded-md text-sm text-gray dark:text-gray"
                wrapperClassName="!rounded-md"
                disabled
              />
            </div>
            <div>
              <div className="text-xs mb-1">New Password</div>
              <Input
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                className="h-[38px] rounded-md"

              />
            </div>
            <div>
              <div className="text-xs mb-1">Confirm Password</div>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                className="h-[38px] rounded-md"
                error={formError}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {rules.map((item) => <div className="flex items-center gap-2 text-black-300 text-xs md:text-sm font-normal dark:text-gray">
                <Icon
                  name="check"
                  size={16}
                  className={twMerge(
                    "text-black-300 dark:text-gray",
                    item.check && '!text-success'
                  )}
                />
                {item.rule}
              </div>
              )}
            </div>
          </div>
          <div className="flex w-full gap-4 mt-6">
            <Button
              appearance="secondary"
              className="w-1/2 h-10 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 h-10 text-sm font-semibold"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Modal>

      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          console.log(open);
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>
    </>
  )
}