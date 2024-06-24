'use client';

import { useEffect, useRef } from 'react';

import { useDropdownDispatch, useDropdownState } from '@/contexts/DropdownContext';

const useDropdownEdit = (id: string) => {
  const ref = useRef<HTMLUListElement>(null);
  const state = useDropdownState();
  const dispatch = useDropdownDispatch();

  const isDropdownOpened = state[id] || false;

  const handleDropdownOpen = () => {
    dispatch({ type: 'CLOSE_ALL', excludeId: id });
    setTimeout(() => {
      dispatch({ type: 'TOGGLE', id });
    }, 0); // Delayed dispatch to allow state to settle
  };

  const handleDropdownClose = () => {
    dispatch({ type: 'TOGGLE', id });
  };

  const handleDropdownToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (isDropdownOpened) {
      handleDropdownClose();
    } else {
      handleDropdownOpen();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      dispatch({ type: 'CLOSE_ALL' });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dispatch]);

  return { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose, handleDropdownToggle };
};

export default useDropdownEdit;
