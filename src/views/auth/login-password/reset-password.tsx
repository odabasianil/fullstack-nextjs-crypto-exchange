import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Modal } from "@/components/ui/modal"
import { useRouter } from "next/navigation"

export const ResetPasswordModal = (props: any) => {
  const { open, setOpen, user } = props
  const router = useRouter();

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="w-[360px] flex flex-col items-center text-center"
        isBackdropClickable={false}
      >
        <Icon
          name="reset-password"
          size={96}
          className="mb-4 !w-[4rem] !h-[4rem] md:!h-[6rem] md:!w-[6rem]"
        />
        <div className="text-lg font-semibold">
          Şifre Sıfırlama
        </div>
        <div className="flex gap-1 items-center mt-4 mb-4">
          <Icon
            name="user"
            size={20}
          />
          <div className="text-sm leading-[22px]">
            {user}
          </div>
        </div>
        <div className="text-sm leading-[22px]">
          Hesabınızı korumak amacıyla, parolanızı değiştirmenizin ardından çekimler, P2P satışları ve ödeme hizmetleri 24 saat boyunca devre dışı bırakılabilir.
        </div>
        <div className="grid grid-cols-2 w-full mt-6 mb-2 items-center gap-2">
          <Button
            appearance="secondary"
            className="w-full h-10 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            İptal
          </Button>
          <Button
            appearance="primary"
            className="w-full h-10 flex items-center justify-center"
            onClick={() => router.push('/forgot-password-mfa')}
          >
            Devam
          </Button>
        </div>
      </Modal>
    </>
  )
}