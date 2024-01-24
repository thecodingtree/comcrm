import React from 'react';

import { cn } from '@/lib/utils';

export interface InputIconProps extends InputProps {
  iconClickable?: boolean;
  icon: React.ReactNode;
}

import { Input, InputProps } from '@/components/ui/input';

const IconInput = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ icon, iconClickable = true, className, ...props }, ref) => {
    return (
      <div className="flex flex-row w-full border rounded-sm bg-white ">
        <Input
          className={cn(
            'w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            'w-[1rem] m-2',
            iconClickable ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          {icon}
        </div>
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export default IconInput;
