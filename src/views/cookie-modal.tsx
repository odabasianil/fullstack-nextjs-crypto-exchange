import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import Link from "next/link";

export const CookieModal = (props: any) => {
  const { open, setOpen } = props;

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="rounded-sm !bg-white min-w-full h-full md:min-w-[575px] md:w-[575px] md:h-max p-0 md:max-h-[90vh] md:overflow-y-auto z-[70]"
    >
      <div className="py-2.5 pl-[30px] border-b border-[#e9e9e9]">
        <Image
          src="/images/logo/logo-big-black.png"
          alt="FAZ 3 logo"
          width={120}
          height={40}
        />
      </div>
      <div className="px-[30px]">
        <div className="text-[#696969] py-2.5 font-semibold">Privacy Prefence Center</div>
        <div className="text-xs text-[#696969]">
          We use cookies to collect data which improves your experience while you navigate through the website. Because we respect your right to privacy, you can choose not to allow some types of cookies. The information does not usually directly identify you but it might be about you, your preferences or your device and is mostly used to improve the site making the site work as you expect it to whilst giving you a personalised experience. Of course, we do all this with your consent and in complete transparency. The cookies that are categorized as "Strictly Necessary" are on by default and are stored on your browser as they are essential for the working of basic functionalities and security of the website. You can choose to enable or disable some or all of the additional cookies if they are present, but disabling some of them may affect your browsing experience.
        </div>
        <Link href="/cookie-settings" className="text-[#3860BE] underline text-xs mb-[25px]">
          Cookie Policy
        </Link>
        <div className="text-[#696969] py-2.5 font-semibold">Manage Consent Preferences</div>
        <div className="mt-2.5">
          <Accordion
            title="Strictly Necessary Cookies"
            contentClassName="!text-xs !pl-0 !bg-transparent"
            className="rounded-none !bg-transparent border border-gray-100 border-b-transparent !py-3 !mb-0"
            titleClassName="text-[#696969] !text-sm !font-semibold"
          >
            These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
          </Accordion>
          <Accordion
            title="Functional Cookies"
            contentClassName="!text-xs !pl-0 !bg-transparent"
            className="rounded-none !bg-transparent border border-gray-100 border-b-transparent !py-3 !mb-0"
            titleClassName="text-[#696969] !text-sm !font-semibold"
          >
            These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.
          </Accordion>
          <Accordion
            title="Targeting Cookies"
            contentClassName="!text-xs !pl-0 !bg-transparent"
            className="rounded-none !bg-transparent border border-gray-100 border-b-transparent !py-3 !mb-0"
            titleClassName="text-[#696969] !text-sm !font-semibold"
          >
            Targeting cookies may be set through our site by ourselves and our advertising partners. First parties and third parties will use them to build a profile of your interests based on the browsing information they collect from you, which includes uniquely identifying your browser and terminal equipment. If you do not allow these cookies you will still see basic advertising on your browser that is generic and not based on your interests
          </Accordion>
          <Accordion
            title="Targeting Cookies"
            contentClassName="!text-xs !pl-0 !bg-transparent"
            className="rounded-none !bg-transparent border border-gray-100 !py-3 !mb-0"
            titleClassName="text-[#696969] !text-sm !font-semibold"
          >
            These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.
          </Accordion>
        </div>
      </div>
      <div className="mt-8 border-t border-[#d8d8d8] h-[73px] max-h-[160px] w-full flex items-center justify-end px-4 gap-4">
        <Button className="rounded-sm px-[30px] py-2.5 font-semibold text-xs h-[38px] border-none" onClick={() => setOpen(false)}>
          Reject Additional Cookies
        </Button>
        <Button className="rounded-sm px-[30px] py-2.5 font-semibold text-xs h-[38px] border-none" onClick={() => setOpen(false)}>
          Confirm My Choices
        </Button>
      </div>
    </Modal>
  )
}