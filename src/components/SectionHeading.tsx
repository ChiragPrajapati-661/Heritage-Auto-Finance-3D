import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', children }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">{description}</p>}
      {children}
    </div>
  );
}
