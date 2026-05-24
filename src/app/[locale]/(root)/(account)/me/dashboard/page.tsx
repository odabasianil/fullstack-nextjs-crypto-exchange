'use client'
import { Button } from "@/components/ui/button"
import { EstimatedBalance } from "@/components/ui/estimated-balance"
import { Modal } from "@/components/ui/modal"
import { Term } from "@/core/models/auth/models/term.model"
import { WalletModel } from "@/core/models/auth/models/wallet/wallet.model"
import { termService } from "@/core/services/user/term.service"
import { userService } from "@/core/services/user/user.service"
import { walletService } from "@/core/services/user/wallet.service"
import { setCookie } from "@/utils/set-cookie"
import { BankModal } from "@/views/account/bank-modal"
import { Announcements } from "@/views/account/dashboard/announcements"
import { MarketsDiscover } from "@/views/account/dashboard/markets-discover"
import { AccountSquare } from "@/views/account/dashboard/square"
import { UserInfo } from "@/views/account/user-info"
import { useEffect, useState } from "react"

export default function Account() {
  const [terms, setTerms] = useState<Term[]>([])
  const [walletList, setWalletList] = useState<WalletModel[]>([]);

  const agreeTerm = (tenantTermId: number) => {
    termService.createTerm({ termsId: tenantTermId }).then((res: any) => {
      if (res.success) {
        setTerms(terms.filter((term) => term.tenantTermId !== tenantTermId))
      }
    }
    );
  }

  const logout = async () => {
    try {
      await userService.logout();
      setCookie('user', '', -1);
      typeof window !== undefined && (window.location.href = '/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userService.userMe().then((res: any) => {
      if (res.data) {
        res?.data?.requiredTerms?.map((term: Term) => {
          if (term.required) {
            setTerms([...terms, term])
          }
        })
      }
    })
  }, [])

  useEffect(() => {
    const fetchBaseWallet = async () => {
      try {
        const result = await walletService.getWalletList();
        if (result.success) {
          setWalletList(result.data);
        }
      } catch (error) {
        console.error("Error fetching initial wallet:", error);
      }
    }
    fetchBaseWallet();
  }, []);

  return (
    <div className="w-full mx-auto max-w-[1352px] lg:px-16">
      <UserInfo />
      <EstimatedBalance walletList={walletList} />
      <MarketsDiscover walletList={walletList} />
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between">
        {/* <div className="flex-1 w-full">
          <AccountSquare />
        </div> */}
        <div className="w-full lg:w-[39%]">
          <Announcements />
        </div>
      </div>
      {
        terms?.length > 0 && (
          terms?.map((term: Term) => {
            return (
              <Modal
                open={true}
                setOpen={() => { }}
                showCloseButton={false}
                className="w-full max-w-[90vw] md:w-auto md:min-w-[600px]"
                title={term?.name}
                isBackdropClickable={false}
              >
                <iframe src={term.url} className="w-full h-[400px] md:h-[500px]" />
                <div className="flex w-full gap-4 mt-4">
                  <Button appearance="secondary" onClick={logout} className="w-full font-semibold px-6 py-2 rounded-md">Logout</Button>
                  <Button onClick={() => agreeTerm(term.tenantTermId)} className="w-full font-semibold px-6 py-2 rounded-md">Agree</Button>
                </div>
              </Modal>
            )
          })
        )
      }
      {/* <BankModal open={true} setOpen={() => {}} /> */}
    </div>
  )
}