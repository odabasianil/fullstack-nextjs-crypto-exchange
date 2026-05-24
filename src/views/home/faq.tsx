import { Accordion } from "@/components/ui/accordion"
import faqData from "@/data/home/faq.json"

export const HomeFaq = () => {

  return (
    <div>
      <h1 className="text-2xl md:text-[40px] md:leading-[3rem] font-semibold mb-4 md:mb-[4rem] mx-auto w-fit text-center">Sık Sorulan Sorular</h1>
      {
        faqData.map((item: any, index: number) => (
          <Accordion index={item.index} title={item.question}>
            <div dangerouslySetInnerHTML={{__html: item.content}} />
          </Accordion>
        ))
      }
    </div>
  )
}