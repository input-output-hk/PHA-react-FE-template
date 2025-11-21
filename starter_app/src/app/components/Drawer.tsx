'use client';
import { createContext, useContext, ComponentProps } from 'react';
import cn from '../utils/styleUtil';
import Button from './Button';
import XMarkIcon from '@heroicons/react/24/solid/esm/XMarkIcon';

interface DrawerContextProps {
  onClose?: () => void;
}

interface DrawerProps extends ComponentProps<'div'> {
  position?: 'left' | 'right';
  open: boolean;
  onClose?: () => void;
}

const DrawerContext = createContext<DrawerContextProps>({
  onClose: undefined,
});

const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('Drawer.* components must be used inside <Drawer>');
  }
  return ctx;
}

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  const { onClose } = useDrawerContext();

  return (
    <div className={cn(`flex flex-row items-center mb-4 mt-2`, className)} {...props}>
      <Button
      variant="embedded"
      content={{ 
          svg: <XMarkIcon />,
          color: 'text',
          size: 'small',
          mode: 'fill',
      }}
      onClick={onClose}
      className='p-0'
      />
      {props.children}
    </div>
  )
}

function DrawerBody({ ...props }: ComponentProps<'div'>) {
  return (
    <div className='flex-1 overflow-y-auto' {...props}>
      {props.children}
    </div>
  )
}

function DrawerFooter({ ...props }: ComponentProps<'div'>) {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
}

export default function Drawer({ position = 'left', open, onClose, children, className }: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ onClose }}>
      <div className={cn(`fixed top-0 ${position}-0 z-3 h-full bg-containerLow shadow-sm p-4 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'} flex flex-col`, className)}>
        {children}
      </div>
    </DrawerContext.Provider>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;