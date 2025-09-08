'use client';
import React, { useState } from 'react';
import cn from '../utils/styleUtil';
import Icon from './Icon';

interface TabProps {
    label: string;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
    onClick?: () => void;
}

interface TabsProps {
    tabs: TabProps[];
    direction?: 'vertical' | 'horizontal';
    variant?: 'underline' | 'filled';
    iconVariant?: 'fill' | 'stroke';
}

export default function Tabs({ direction = 'horizontal', variant = 'underline', iconVariant = 'fill', tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    
    return <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row gap-3'}`}>
        {tabs.map((tab, index) => (
            <button
                key={index}
                className={cn(`inline-flex items-center justify-center p-2 whitespace-nowrap text-sm font-medium text-onSurface gap-2
                    ${variant === 'filled' && 'rounded-md'} 
                    ${(variant === 'filled' && index !== activeTab) && 'hover:bg-containerHigh hover:text-onSurface-variant'} 
                    ${(variant === 'underline' && index !== activeTab) && 'hover:border-b-2 hover:border-outline'} 
                    ${(variant === 'underline' && index === activeTab) && 'border-b-2 border-primary text-primary'} 
                    ${(variant === 'filled' && index === activeTab) && 'bg-primary text-onPrimary'}`,)}
                onClick={() => {
                    setActiveTab(index); 
                    if (tab.onClick) tab.onClick(); 
                }} 
                disabled={tab.disabled}>
                {tab.icon && 
                    <Icon 
                        svg={tab.icon} 
                        size='xsmall' 
                        color={index === activeTab ? (variant === 'filled' ? 'surface' : 'primary') : 'onVariant'} 
                        mode={iconVariant} />}
                {tab.label}
            </button>
        ))}
    </div>;
}

