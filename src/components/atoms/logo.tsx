// background: linear-gradient(101deg, #543787 4.16%, #C13F2D 54.2%, #CB7C33 92.73%);

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn('flex text-center flex-col gap-1 w-fit', className)}>
      <h1 className="text-[64px] uppercase text-chatexto-gradient">Chatexto</h1>
      <h2 className="text-[24px] uppercase">Contexto on steriods</h2>
    </div>
  );
};

export default Logo;
