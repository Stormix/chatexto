import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  className?: string;
}

const Alert = ({ children, className }: AlertProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-4 px-5 py-3 border-2 rounded-full w-fit', className)}>
      {children}
    </div>
  );
};

export default Alert;
