import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, children, className }: SectionProps) => (
  <section className={cn('border-2 flex flex-col', className)}>
    <div className="flex items-center gap-4 px-5 py-3 text-sm text-white uppercase bg-border">{title}</div>
    {children}
  </section>
);

export default Section;
