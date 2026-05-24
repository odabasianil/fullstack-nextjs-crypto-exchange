import { Button } from "@/components/ui/button"

export const RegisterBanner = () => {

  return (
    <>
      <div className="container py-6 md:py-[3rem] flex flex-col items-center justify-center">
        <p className="md:text-[40px] md:leading-[48px] font-medium md:font-semibold mb-4 md:mb-10">Kazanmaya hemen başlayın</p>
        <Button 
          className="py-2 px-4 min-w-[128px] md:min-w-[164px] font-medium text-sm md:text-base !border-none"
        >
          Hemen Kaydol
        </Button>
      </div>
    </>
  )
}