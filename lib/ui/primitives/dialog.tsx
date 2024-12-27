'use client'

import { createContext, forwardRef, useContext } from 'react'

import { cn } from '../utils'
import OutlinedClose from '../icons/outlined-close'

interface DialogPrimitiveProps {
  hideCloseIcon?: boolean
  classNames?: {
    content?: string
  }
}

type DialogContextProps = {
  dialogRef: HTMLDialogElement | null
}

const DialogContext = createContext<DialogContextProps | null>(null)

function useDialog() {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within a <Dialog />')
  }

  return context
}

const DialogCloseTrigger = (props: React.ComponentProps<'div'>) => (
  <div
    onClick={(event) => {
      const parentDialog = event.currentTarget?.closest('dialog')
      parentDialog?.close()
    }}
    {...props}
  />
)

const DialogCloseIcon = ({ ...props }: React.ComponentProps<'div'>) => (
  <DialogCloseTrigger
    {...props}
    className="absolute top-2 right-2 cursor-pointer"
  >
    <OutlinedClose />
  </DialogCloseTrigger>
)

const DialogRoot = forwardRef<
  HTMLDialogElement,
  React.ComponentProps<'dialog'> & DialogPrimitiveProps
>(({ children, className, hideCloseIcon, classNames, ...props }, ref) => (
  <dialog
    ref={ref}
    className={cn(
      'open:animate-in open:fade-in-0 open:zoom-in-95 ltr:open:slide-in-from-right-1/2 rtl:open:slide-in-from-left-1/2 open:slide-in-from-top-[48%] backdrop:bg-backgroundMain-mask/[0.3] rounded-xl p-0',
      className
    )}
    {...props}
  >
    <div
      className={cn('relative w-[350px] min-h-[100px] max-h-[80vh] overflow-y-auto p-4', classNames?.content)}
    >
      {children}
    </div>
    {!hideCloseIcon && <DialogCloseIcon />}
  </dialog>
))

DialogRoot.displayName = 'DialogRoot'
const DialogOpenTrigger = forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ ...props }, ref) => {
  const { dialogRef } = useDialog()
  return (
    <div
      ref={ref}
      {...props}
      onClick={() => {
        dialogRef?.showModal()
      }}
    />
  )
})

DialogOpenTrigger.displayName = 'DialogOpenTrigger'

export {
  DialogCloseTrigger,
  DialogContext,
  DialogOpenTrigger,
  DialogRoot,
  useDialog,
}
