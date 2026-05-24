import { Button } from "@/components/ui/button"

export const ModalButtons = ({onClick}: {onClick: any}) => {

  return (
    <div className="flex items-center w-full gap-2">
      <Button
        appearance="secondary"
        onClick={() => onClick()}
        className="hidden md:flex w-full h-10 rounded-lg font-semibold"
      >
        Cancel
      </Button>
      <Button
        onClick={() => onClick()}
        className="w-full h-10 rounded-lg font-semibold"
      >
        Confirm
      </Button>
    </div>
  )
}