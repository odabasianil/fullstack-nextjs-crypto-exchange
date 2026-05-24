'use client'
import { Accordion } from '@/components/ui/accordion'
import footer from '@/data/footer/list.json'
import footertr from '@/data/footer/list-tr.json'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

export const FooterList = () => {
  const { i18n } = useTranslation()
  const list = i18n.language === 'tr' ? footertr : footer
  return (
    <div className='grid md:grid-cols-3 md:gap-6'>
      {
        list.map((parentItem, index: number) => (
          <div key={"parent" + index} className={twMerge(
            'flex flex-col md:gap-10',
          )}>
            {
              parentItem.items.map((item: any, index: number) => (
                <div key={'parentitem' + index}>
                  <div className='md:hidden'>
                    <Accordion
                      title={item.title}
                      isFaq={false}
                    >
                      <ul className='flex flex-col gap-4'>
                        {
                          item.items.map((link: any, index: number) => (
                            <li key={"link" + index}>
                              <Link className='text-sm hover:text-primary' href={link.url}>
                                {link.title}
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </Accordion>
                  </div>
                  <div className='hidden md:block'>
                    <h3 className='font-semibold'>{item.title}</h3>
                    <ul className='mt-4 flex flex-col gap-2'>
                      {
                        item.items.map((link: any, index: number) => (
                          <li key={'linkitem' + index}>
                            <Link className='text-sm hover:text-primary' href={link.url}>
                              {link.title}
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}