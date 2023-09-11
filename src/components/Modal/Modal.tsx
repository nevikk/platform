import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Mods, classNames } from '../../helper/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;


export const Modal = (props: ModalProps) => {

  const {
    className,
    children,
    isOpen,
    onClose,
    lazy
  } = props;

  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);
  
  const closeHandler = useCallback(
    () => {
      if (onClose) {
        setIsClosing(true);
        timerRef.current = setTimeout(() => {
          onClose();
          setIsClosing(false);
        }, ANIMATION_DELAY)
      }
    }, [onClose]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if(isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [isOpen, onKeyDown])
  
  const mods: Mods = {
    [cls.opened]: isMounted,
    [cls.isClosing]: isClosing,
  }

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  if (lazy && !isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div onClick={closeHandler} className={cls.overlay}>
          <div 
            onClick={(e) => onContentClick(e)} 
            className={cls.content}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
    
  );
};