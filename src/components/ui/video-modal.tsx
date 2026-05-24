import { Modal } from "./modal";


type VideoModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string
  video: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  poster?: string;
  controls?: boolean;
}

export const VideoModal = (props: VideoModalProps) => {
  const { open, setOpen, video, title, poster, loop, autoPlay, muted, controls } = props;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        titleWrapperClass="px-4 border-b border-b-white-300 dark:border-secondary pb-4"
        showCloseButton
        className="px-0 w-screen max-w-screen h-full md:h-max md:max-w-[80vw] md:w-[720px] rounded-md dark:!bg-[rgb(24,26,32)]"
      >
        <div className="p-6">
          <video 
            src={video}
            poster={poster}
            width="100%"
            controls
            autoPlay={false}
            loop={false}
            muted={false}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </>
  )
}