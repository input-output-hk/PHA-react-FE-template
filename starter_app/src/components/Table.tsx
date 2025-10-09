'use client';
import React from 'react';
import type {ComponentProps} from 'react';
import cn from '../utils/styleUtil';

export function TableContainer({ ...props}: ComponentProps<'div'>) {
    return <div className={cn('w-full h-full flex flex-col bg-containerLowest border-outline/50 border')} {...props} />;
}

export function Table({ ...props}: ComponentProps<'table'>) {
    return <div className='overflow-auto flex-1'>
      <table className={cn('w-full text-sm border-collapse')} {...props} />
    </div>;
}

export function TableHeader({ ...props }: ComponentProps<"thead">) {
  return (
    <thead
      className={cn("bg-containerLowest sticky top-0")}
      {...props}>
      <tr>
        {props.children}
      </tr>
    </thead>
  );
}

export function TableBody({ ...props }:ComponentProps<"tbody">) {
  return (
    <tbody
      {...props}
    />
  );
}

export function TableFooter({ ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      {...props}
    />
  );
}

export function TableRow({ ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-outline/50 border-b odd:bg-containerLow")}
      {...props}
    />
  );
}

export function TableHead({ ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn("p-2 pl-5 pr-5 text-onSurface/80 font-medium text-left whitespace-nowrap")}
      {...props}
    />
  );
}

export function TableCell({ ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn("p-2 pl-5 pr-5 text-onSurface/90 whitespace-nowrap")}
      {...props}
    />
  );
}