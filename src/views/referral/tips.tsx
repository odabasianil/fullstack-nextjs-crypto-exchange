import { Icon } from "@/components/ui/icon"

export const ReferralTips = () => {
  const tips = [
    {
      icon: 'user',
      title: 'Step 1',
      description: 'Share your referral link with friends'
    },
    {
      icon: 'user',
      title: 'Step 2',
      description: 'Invite friends to sign up and accumulatively deposit more than $50'
    },
    {
      icon: 'user',
      title: 'Step 3',
      description: 'Receive 100 USD cashback voucher each'
    }    
  ]
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="tip" size={32} />
        <div className="font-semibold text-[32px] leading-10">Tips</div>
      </div>
      <div className="flex gap-6">
        {tips.map((tip) => (
          <div className="p-6 rounded-lg flex-1 bg-white-200 dark:bg-black-100">
             <Icon name={tip.icon} size={48} className="mb-6" /> 
              <div className="text-xl font-semibold mb-2">{tip.title}</div>
              <div className="text-sm text-gray-300 dark:text-gray-100">{tip.description}</div>
          </div>
          )
        )}
      </div>
    </div>
  )
}