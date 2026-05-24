import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Modal } from "@/components/ui/modal"
import smsControl from "@/data/auth/otp-sms-modal.json"
import emailControl from "@/data/auth/otp-email-modal.json"
import { useRouter } from "next/navigation"

export const CodeModal = (props: any) => {
  const { open, setOpen, user } = props
  const router = useRouter();

  const data = user.type === 'phone' ? smsControl : emailControl

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="w-[360px] flex flex-col items-center text-center"
        isBackdropClickable={false}
      >
        <Icon
          name={user.type === 'phone' ? "no-sms-code" : "no-email-code"}
          size={96}
          className="mb-4 !w-[4rem] !h-[4rem] md:!h-[6rem] md:!w-[6rem]"
        />
        <div className="text-2xl font-semibold mb-2">
          {user.type === 'phone' ? 'SMS Doğrulama Kodunu Almadınız mı?' : 'E-Posta Doğrulama Kodunu Almadınız mı?'}
        </div>
        <div className="mb-2 text-sm leading-[22px] text-left">
          {
            user.type === 'phone' ?
            'SMS doğrulama kodu telefonunuza gönderildi. Birkaç denemeden sonra hala kodu alamadıysanız, lütfen şunları deneyin:' :
            'E-posta doğrulama kodu e-posta adresinize gönderildi. Birkaç denemeden sonra hala kodu alamadıysanız, lütfen şunları deneyin:'
          }
        </div>
        <div className="text-sm leading-[22px] text-left">
          <div className="rounded-md max-h-[140px] overflow-y-auto bg-white-100 dark:bg-black-400 md:dark:bg-secondary px-3 py-2">
            {
              data.map((item: string, index: number) => (
                <div>{item}</div>
              ))
            }
          </div>
        </div>
        <Button
          appearance="primary"
          className="w-full mt-6 h-12 rounded-[10px] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          Tamam
        </Button>
        {
          user.type === 'phone' &&
          <Button
            appearance="secondary"
            className="w-full mt-3 h-12 rounded-[10px] flex items-center justify-center"
            onClick={() => router.push('/register')}
          >
            Sesli doğrulamayı deneyin
          </Button>
        }
      </Modal>
    </>
  )
}