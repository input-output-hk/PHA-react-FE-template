'use client';
import { ReactElement, SVGProps, ChangeEvent } from 'react';
import cn from '../utils/styleUtil';
import Icon from './Icon';

interface TabProps {
    label: string;
    icon?: ReactElement<SVGProps<SVGSVGElement>>;
    disabled?: boolean;
}

interface TabsProps {
    tabs: TabProps[];
    activeTab?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    direction?: 'vertical' | 'horizontal';
    variant?: 'underline' | 'filled';
    iconVariant?: 'fill' | 'stroke';
}

export default function Tabs({ direction = 'horizontal', variant = 'underline', iconVariant = 'fill', tabs, activeTab, onChange }: TabsProps) {
    
    return <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row gap-3'}`}>
        {tabs.map((tab) => (
            <button
                key={tab.label}
                id={tab.label}
                className={cn(`inline-flex items-center justify-center p-2 whitespace-nowrap text-sm font-medium text-onSurface gap-2
                    ${variant === 'filled' && 'rounded-md'} 
                    ${(variant === 'filled' && tab.label !== activeTab) && 'hover:bg-containerHigh hover:text-onSurface-variant'} 
                    ${(variant === 'underline' && tab.label !== activeTab) && 'hover:border-b-2 hover:border-outline'} 
                    ${(variant === 'underline' && tab.label === activeTab) && 'border-b-2 border-primary text-primary'} 
                    ${(variant === 'filled' && tab.label === activeTab) && 'bg-primary text-surface'}`,)}
                onClick={(e) => onChange(e as unknown as ChangeEvent<HTMLInputElement>)}
                disabled={tab.disabled}>
                {tab.icon && 
                    <Icon 
                        svg={tab.icon} 
                        size='xsmall' 
                        color={tab.label === activeTab ? (variant === 'filled' ? 'surface' : 'primary') : 'onVariant'} 
                        mode={iconVariant} />}
                {tab.label}
            </button>
        ))}
    </div>;
}

