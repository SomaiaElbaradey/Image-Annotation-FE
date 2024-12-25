'use client'

import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'

import { DialogContext, DialogOpenTrigger, DialogRoot } from '../../primitives'

type DialogProps = {
  // The rendered JSX that opens the modal itself
  trigger?: React.ReactNode
  children: React.ReactNode
  onOpenChange?: (state: boolean) => void
  hideClose?: boolean
  closeOnMaskClick?: boolean
  classNames?: {
    content?: string
  }
} & React.ComponentPropsWithoutRef<'dialog'>

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      hideClose,
      trigger,
      children,
      className,
      closeOnMaskClick,
      ...rest
    },
    ref
  ) => {
    const [dialogRef, setDialogRef] = useState<HTMLDialogElement | null>(null)
    /*
      Updating parent node ref in case there's a need to grab the dialog node in parent.
      So its possible to ref <Dialog /> and grab the node in parent,
      And also children components can access useDialog() to grab "dialogRef" to control dialog too.
    */
    useImperativeHandle(ref, () => dialogRef!, [dialogRef])

    const onMaskClick = (isDialog: boolean) => {
      if (closeOnMaskClick && isDialog) {
        dialogRef?.close()
      }
    }

    const contextValue = useMemo(
      () => ({
        dialogRef,
      }),
      [dialogRef]
    )

    return (
      <DialogContext.Provider value={contextValue}>
        <DialogRoot
          ref={(element) => setDialogRef(element)}
          className={className}
          hideCloseIcon={hideClose}
          {...rest}
          onClick={(event) => {
            const isDialog = event.target === dialogRef
            onMaskClick(isDialog)
          }}
        >
          {children}
        </DialogRoot>
        <DialogOpenTrigger>{trigger}</DialogOpenTrigger>
      </DialogContext.Provider>
    )
  }
)

export default Dialog
Dialog.displayName = 'Dialog'
