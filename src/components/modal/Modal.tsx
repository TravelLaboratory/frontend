/* eslint-disable max-len */

'use client';

import React from 'react';

import ReactModal from 'react-modal';

import CloseSvg from '@/icons/x.svg';

export interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  onAfterOpen?: ReactModal.OnAfterOpenCallback;
  onAfterClose?: () => void;
  className?: string;
  sameMdPadding?: boolean;
}

/**
 * Modal component for displaying modal content.
 *
 * @param {React.ReactNode} children - Content to be displayed inside the modal.
 * @param {function} onClose - (optional) Callback function called when the modal is closed.
 * @param {function} onAfterOpen - (optional) Callback function called after the modal is opened.
 * @param {function} onAfterClose - (optional) Callback function called after the modal is closed.
 * @param {string} className - (optional) Additional CSS class names for the modal container.
 */

export default function Modal({
  children,
  onClose,
  onAfterOpen,
  onAfterClose,
  className = '',
  sameMdPadding
}: ModalProps) {
  const modalRoot = document.querySelector<HTMLElement>('#modal-root') ?? document.body;

  return (
    <ReactModal
      isOpen
      className={`fixed-center relative size-full overflow-hidden rounded-[0.625rem] bg-white-01 shadow-modal ${className}`}
      overlayClassName="bg-overlay fixed-center size-full"
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      parentSelector={() => modalRoot}
      appElement={modalRoot}
    >
      <CloseSvg className="absolute right-5 top-5 z-50 size-5 cursor-pointer md:size-5" onClick={onClose} />
      <div
        className={`scrollbar-custom size-full max-h-[100vh] overflow-auto p-5 max-md:scrollbar-hide ${!sameMdPadding && 'md:p-10'}`}
      >
        {children}
      </div>
    </ReactModal>
  );
}
