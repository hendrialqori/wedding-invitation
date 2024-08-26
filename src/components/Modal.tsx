import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from "react-icons/io";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

function Modal({ open, setOpen, children }: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            {children}
        </Dialog.Root>
    )
}

function ModalContent({ children }: { children: React.ReactNode }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/80 data-[state=open]:animate-overlayShow" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]">
                <Dialog.Title className='heading-4 text-center font-dancing-script'>Wedding Gift</Dialog.Title>
                <Dialog.Description className='text-center text-sm md:text-base'>Your blessing is a very meaningful gift to us.</Dialog.Description>
                {children}
                <Dialog.Close asChild>
                    <button className='absolute top-[10px] right-[10px]'>
                        <IoMdClose className='text-xl' />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

Modal.Button = Dialog.Trigger
Modal.Content = ModalContent

export default Modal