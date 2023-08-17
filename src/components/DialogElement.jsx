import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';




function DialogElement({
    isOpen,
    title = '',
    handleClose,
    children,
}) {
    const handleClick = () => handleClose();


    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={handleClick} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-gray-700 p-4 rounded-xl">
                            <Dialog.Title>{title}</Dialog.Title>

                            {children}

                            <button onClick={handleClick}>Close</button>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}


export default DialogElement;
