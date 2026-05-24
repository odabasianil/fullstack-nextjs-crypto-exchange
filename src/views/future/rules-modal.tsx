import { HelpText } from "@/components/ui/help-text";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const RulesModal = (props: any) => {
  const { open, setOpen, coin1, coin2 } = props;
  const tabs = ['Coin Info', 'Trading Rules', 'Funding Rate History', 'Leverage & Margin'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const options = [
    {
      label: 'BTCUSDT Perpetual',
      value: 'btcusdt_perpetual'
    },
    {
      label: 'ETHUSDT Perpetual',
      value: 'ethusdt_perpetual'
    },
    {
      label: 'XRPUSDT Perpetual',
      value: 'xrpusdt_perpetual'
    },
    {
      label: 'LTCUSDT Perpetual',
      value: 'ltcusdt_perpetual'
    }
  ]

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'F10') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  const Item = ({ label, value, helpText="" }: any) => (
    <div className="flex items-center justify-between w-full text-sm mb-3">
      <div className={twMerge("text-gray-300 dark:text-gray relative group", helpText && 'cursor-help')}>
        {label}
        {helpText && <HelpText>{helpText}</HelpText>}
      </div>
      <div className="">{value}</div>
    </div>
  )

  const CoinInfo = () => {

    return (
      <>
        <div className="rounded-sm bg-[#3C2601] mb-3 p-3 pl-[26px] flex gap-2">
          <Icon name="warning" size={24} className="min-w-6 text-primary-100" />
          <div className="text-sm leading-[23px]">
            The data presented is for informational purposes only. It is provided by CoinMarketCap, and shown on an "as is" basis, without representation or warranty of any kind. <Link href={coin1} target="_blank" className="font-semibold text-primary-100 float-right">General Risk Warning here &gt;</Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Image src="https://www.cryptocompare.com/media/19633/btc.png" width={24} height={24} alt="btc" />
            Bitcoin <span className="text-sm text-gray-300 dark:text-gray">{coin1}</span>
          </div>
          <span className="text-gray-300 dark:text-gray text-sm">No. 1</span>
        </div>
        <Item label="Market Cap" value="$1,023,213,432,423" />
        <Item label="Circulation Supply" value="19,034,234" />
        <Item label="Max Supply" value="21,034,234" />
        <Item label="Total Supply" value="19,750,234" />
        <Item label="Issue Date" value="2019-04-23" />
        <Item label="Issue Price" value="$0.01" />
        <div className="text-gray-300 dark:text-gray text-sm pb-2">Information</div>
        <div className="text-sm dark:text-gray-100">
          Bitcoin (BTC) is a peer-to-peer cryptocurrency that aims to function as a means of exchange that is independent of any central authority. BTC can be transferred electronically in a secure, verifiable, and immutable way.
          <br />
          <br />
          Launched in 2009, BTC is the first virtual currency to solve the double-spending issue by timestamping transactions before broadcasting them to all of the nodes in the Bitcoin network. The Bitcoin Protocol offered a solution to the Byzantine Generals' Problem with a blockchain network structure, a notion first created by Stuart Haber and W. Scott Stornetta in 1991.
          <br />
          <br />
          Bitcoin’s whitepaper was published pseudonymously in 2008 by an individual, or a group, with the pseudonym “Satoshi Nakamoto”, whose underlying identity has still not been verified.
          <br />
          <br />
          The Bitcoin protocol uses an SHA-256d-based Proof-of-Work (PoW) algorithm to reach network consensus. Its network has a target block time of 10 minutes and a maximum supply of 21 million tokens, with a decaying token emission rate. To prevent fluctuation of the block time, the network's block difficulty is re-adjusted through an algorithm based on the past 2016 block times.
          <br />
          <br />
          With a block size limit capped at 1 megabyte, the Bitcoin Protocol has supported both the Lightning Network, a second-layer infrastructure for payment channels, and Segregated Witness, a soft-fork to increase the number of transactions on a block, as solutions to network scalability.
        </div>


      </>
    )
  }

  const TradingRules = () => {

    return (
      <>
        <Item label="Min. Trade Amount" value={`0.001 ${coin1}`} helpText="The minimum Limit Order amount for the contract." />
        <Item label="Min. Price Movement" value={`0.10 ${coin2}`} helpText="The minimum change in the unit price of the contract." />
        <Item label="Price Precision" value={`0.01`} helpText="The minimum change in the unit price of the contract." />
        <Item label="Limit Buy Order Price Cap Ratio" value={`5%`} helpText="The buy price of limit orders should be less or equal to (1 + cap ratio )* current Mark Price of the contract." />
        <Item label="Limit Sell Order Price Cap Ratio" value={`5%`} helpText="The sell price of limit orders should be greater or equal to (1 - cap ratio )* current Mark Price of the contract." />
        <Item label="Min. Trade Amount" value={`0.001 ${coin1}`} helpText="The minimum Limit Order amount for the contract." />
        <Item label="Min. Price Movement" value={`0.10 ${coin2}`} helpText="The minimum change in the unit price of the contract." />
        <Item label="Price Precision" value={`0.01`} helpText="The minimum change in the unit price of the contract." />
        <Item label="Limit Buy Order Price Cap Ratio" value={`5%`} helpText="The buy price of limit orders should be less or equal to (1 + cap ratio )* current Mark Price of the contract." />
        <Item label="Limit Sell Order Price Cap Ratio" value={`5%`} helpText="The sell price of limit orders should be greater or equal to (1 - cap ratio )* current Mark Price of the contract." />
        <Item label="Min. Trade Amount" value={`0.001 ${coin1}`} helpText="The minimum Limit Order amount for the contract." />
        <Item label="Min. Price Movement" value={`0.10 ${coin2}`} helpText="The minimum change in the unit price of the contract." />
        <div className="text-xs py-3">Reduce Only Trigger</div>
        <Item label="Price Precision" value={`0.01`} helpText="The minimum change in the unit price of the contract." />
        <Item label="Limit Buy Order Price Cap Ratio" value={`5%`} helpText="The buy price of limit orders should be less or equal to (1 + cap ratio )* current Mark Price of the contract." />
        <Item label="Limit Sell Order Price Cap Ratio" value={`5%`} helpText="The sell price of limit orders should be greater or equal to (1 - cap ratio )* current Mark Price of the contract." />
        <Link href="/en/futures/trading-rules/perpetual" target="_blank" className="text-primary-100 text-sm font-semibold">
          View All Symbols'Trading Rules
        </Link>
      </>
    )
  }

  const FundingRateHistory = () => {

    return (
      <>
        <div className="pb-8 text-sm font-semibold">Funding Rate: 0.00001428%</div>
        <Image 
          src="/images/trade/dark/margin-chart.png"
          width={411}
          height={168}
          alt="margin-chart"
        />

      </>
    )
  }

  const LeverageAndMargin = () => {

    return (
      <>
        {
          new Array(12).fill(null).map((idx, index) => (
            <div className="pb-[26px]">
              <div className="pb-2.5">Tier {index + 1}</div>
              <Item label="Position Bracket (Notional Value in USDT)" value="0 - 50,000" helpText="Your position notional value include both long and short positions." />
              <Item label="Max Leverage" value="125x" helpText="The max leverage available depends on the notional value of your position." />
              <Item label="Maintenance Margin Rate" value="0.40%" helpText="Maintenance Margin is calculated based on your positions at different notional value tiers." />
              <Item label={`Maintenance Amount (${coin2})`} value="40" helpText="= [ Floor of Position Bracket on Tier n * ( Difference between Maintenance Margin Rate on Tier n and Tier n-1) ] + Maintenance Amount on Tier n-1" />
            </div>
          ))
        }
      </>
    )
  }
  
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="max-w-full w-screen h-screen md:h-max md:w-[640px] rounded-sm bg-white dark:!bg-[rgb(24,26,32)] p-0"
      >
        <div className="px-6 py-[18px] flex items-center justify-between border-b border-white-300 dark:border-[rgb(71,77,87)]">
          <div className="flex items-center gap-4">
            <Select
              options={options}
              wrapperClassName="border-none"
              valueClass="text-xl text-black-100 dark:text-white-100 whitespace-nowrap px-0"
              className="w-min pr-0"
              isSearchable
            />
            <div className="flex items-end gap-1">
              <div className={twMerge("text-green md:text-xl font-semibold")}>52,966.1</div>
              <div className={twMerge("text-error text-xs mb-0.5 font-semibold")}>-3,023.5 -5.40%</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="text-sm text-gray-300 dark:text-gray">F10</div>
            <div onClick={() => setOpen(false)} className="cursor-pointer">
              <Icon name="close" size={24} className="text-gray-300 dark:text-gray" />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[180px] flex-0 border-r border-white-300 dark:border-[rgb(71,77,87)]">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setSelectedTab(tab)}
                className={twMerge(
                  'w-full cursor-pointer px-[18px] py-2.5 text-sm text-gray-300 dark:text-gray relative my-1',
                  selectedTab === tab && 'text-black-100 dark:text-white-100'
                )}
              >
                {tab}
                {selectedTab === tab && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1 bg-primary"></div>}
              </div>
            ))}
          </div>
          <div className="flex-1 p-6 w-full">
            <div className="pb-[30px] overflow-y-auto md:h-[476px]">
              {selectedTab === 'Coin Info' && <CoinInfo />}
              {selectedTab === 'Trading Rules' && <TradingRules />}
              {selectedTab === 'Funding Rate History' && <FundingRateHistory />}
              {selectedTab === 'Leverage & Margin' && <LeverageAndMargin />}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}