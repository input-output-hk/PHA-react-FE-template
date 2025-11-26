'use client';

import React, { ReactNode, useEffect, useRef, useState, cloneElement, Children } from 'react';
import cn from '../utils/styleUtil';
import Chip from './Chip';
import Menu, { MenuClearProps, MenuGroupProps, MenuItemProps } from './Menu';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectBoxProps {
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  showAllSelected?: boolean;
  className?: string;
  onChange?: (values: string[]) => void;
  children: ReactNode;
}

export default function SelectBox({
  label,
  placeholder = 'Select',
  multiple = false,
  searchable = false,
  showAllSelected = false,
  className,
  onChange,
  children,
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleChipCount, setVisibleChipCount] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [valueToLabelMap, setValueToLabelMap] = useState<Record<string, string>>({});

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chipContainerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Build value-to-label mapping from children
  useEffect(() => {

    // Helper: Extract text label from Menu.Item children
    const extractLabel = (children: ReactNode): string => {

      // Simple string
      if (typeof children === 'string') {
        return children;
      }
      
      // React element with children (like <div><span>Label</span><icon/></div>)
      if (React.isValidElement(children)) {
        const props = children.props as { children?: ReactNode };
      
        if (props.children) {
          const innerChildren = props.children;
          
          // If it's an array, find the first text element
          if (Array.isArray(innerChildren)) {
            for (const child of innerChildren) {
              if (typeof child === 'string') return child;
              if (React.isValidElement(child)) {
                const childProps = child.props as { children?: ReactNode };
                if (typeof childProps.children === 'string') {
                  return childProps.children;
                }
              }
            }
          }
          
          // Single child
          if (typeof innerChildren === 'string') {
            return innerChildren;
          }
        }
      }
      
      return '';
    };

    // Recursive function to build value-to-label map
    const buildMap = (node: ReactNode, groupLabel?: string): Record<string, string> => {
      const map: Record<string, string> = {};
      
      Children.forEach(node, (element) => {
        if (!React.isValidElement(element)) return;
        
        const child = element as React.ReactElement<MenuItemProps | MenuGroupProps>;
        
        // Handle Menu.Item
        if (child.type === Menu.Item) {
          const { value, children } = child.props as MenuItemProps;
          
          if (value) {
            const itemLabel = extractLabel(children) || value;
            map[value] = groupLabel ? `${groupLabel} - ${itemLabel}` : itemLabel;
          }
        }
        
        // Handle Menu.Group - recurse with group label
        if (child.type === Menu.Group) {
          const { label, children } = child.props as MenuGroupProps;
          Object.assign(map, buildMap(children, label));
        }
      });
        
      return map;
    };

    setValueToLabelMap(buildMap(children));
  }, [children]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Dynamic chip calculation based on available width
  useEffect(() => {
    if (!multiple || !chipContainerRef.current || !triggerRef.current) {
      setVisibleChipCount(selected.length);
      return;
    }

    if (showAllSelected) {
      setVisibleChipCount(selected.length);
      return;
    }

    const calculateVisibleChips = () => {
      const container = chipContainerRef.current;
      const trigger = triggerRef.current;
      if (!container || !trigger) return;
    
      // Account for: padding (24px) + chevron (20px) + gap (8px) + "+N more" (80px) + input (120px if searchable)
      const paddingAndChevron = 24 + 20 + 16; // px-3 on both sides = 24px, chevron = 20px, safety margin = 16px
      const moreButtonWidth = 80;
      const inputWidth = searchable ? 120 : 0;
      const reservedSpace = paddingAndChevron + moreButtonWidth + inputWidth;
      
      const availableWidth = trigger.offsetWidth - reservedSpace;
      
      let totalWidth = 0;
      let count = 0;
      
      const chips = container.querySelectorAll('.chip-item');
      for (let i = 0; i < chips.length; i++) {
        const chipWidth = (chips[i] as HTMLElement).offsetWidth + 8; // Include gap
        if (totalWidth + chipWidth < availableWidth) {
          totalWidth += chipWidth;
          count++;
        } else {
          break;
        }
      }
    
      setVisibleChipCount(Math.max(1, count));
    };

    // Calculate on mount and when selected changes
    calculateVisibleChips();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateVisibleChips);
    return () => window.removeEventListener('resize', calculateVisibleChips);
  }, [selected, multiple, showAllSelected, searchable]);

  const visibleItems =
    showAllSelected || visibleChipCount === selected.length
      ? selected
      : selected.slice(0, visibleChipCount);

  const overflowCount = selected.length - visibleItems.length;

  const toggleValue = (value: string) => {
    let next: string[];
    if (multiple) {
      next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    } else {
      next = [value];
      setOpen(false);
    }

    setSelected(next);
    onChange?.(next);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const clearAll = () => {
    setSelected([]);
    onChange?.([]);
  };

  // Filter children based on search
  const filterChildren = (node: ReactNode, searchLower: string): { node: ReactNode; values: string[] } => {
    let matchedValues: string[] = [];
    
    const filtered = Children.map(node, (element) => {
      if (!React.isValidElement(element)) return element;

      const child = element as React.ReactElement<MenuItemProps | MenuGroupProps>;

      if (
        child.type === Menu.Clear ||
        child.type === Menu.Divider
      ) {
        return child;
      }

      if (child.type === Menu.Item) {
        const itemProps = child.props as MenuItemProps;
        const itemText = typeof itemProps.children === 'string' 
          ? itemProps.children 
          : itemProps.value || '';
        
        if (searchLower && !itemText.toLowerCase().includes(searchLower)) {
          return null;
        }
        
        if (itemProps.value) {
          matchedValues.push(itemProps.value);
        }
        
        return child;
      }

      if (child.type === Menu.Group) {
        const groupProps = child.props as MenuGroupProps;
        const { node: filteredChildren, values: childValues } = filterChildren(groupProps.children, searchLower);
        
        if (childValues.length === 0) return null;
        
        matchedValues = [...matchedValues, ...childValues];
        
        return cloneElement(child, {
          children: filteredChildren,
        });
      }

      return child;
    });

    return { node: filtered, values: matchedValues };
  };

  // Enhance children with props
  const enhanceChildren = (node: ReactNode, filteredValues: string[]): ReactNode => {
    let currentIndex = -1;
    
    return Children.map(node, (element) => {
      if (!React.isValidElement(element)) return element;

      const child = element as React.ReactElement<MenuClearProps | MenuItemProps | MenuGroupProps>;

      if (child.type === Menu.Clear) {
        return cloneElement(child, {
          onClear: () => clearAll(),
        });
      }

      if (child.type === Menu.Item) {
        const itemProps = child.props as MenuItemProps;
        const value = itemProps.value;

        if (typeof value === 'string') {
          currentIndex++;
          const isHighlighted = currentIndex === highlightedIndex;
          
          return cloneElement(child, {
            selected: selected.includes(value),
            highlighted: isHighlighted,
            onClick: (e: React.MouseEvent<HTMLLIElement>) => {
              itemProps.onClick?.(e);
              toggleValue(value);
            },
          });
        }

        return child;
      }

      if (child.type === Menu.Group) {
        const groupProps = child.props as MenuGroupProps;
        return cloneElement(child, {
          children: enhanceChildren(groupProps.children, filteredValues),
        });
      }

      return child;
    });
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if (!open) return;

    const searchLower = searchTerm.toLowerCase();
    const { values: filteredValues } = filterChildren(children, searchLower);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev < filteredValues.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredValues.length) {
        toggleValue(filteredValues[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  };

  const searchLower = searchTerm.toLowerCase();
  const { node: filteredChildren, values: filteredValues } = filterChildren(children, searchLower);
  const enhancedChildren = enhanceChildren(filteredChildren, filteredValues);

  // Reset highlight when search changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchTerm]);

  // // Render label for display
  // const renderLabel = () => {
  //   if (multiple) {
  //     if (selected.length === 0) return placeholder;
  //     if (selected.length === 1) return valueToLabelMap[selected[0]] || selected[0];
  //     return `${selected.length} selected`;
  //   }
  //   return valueToLabelMap[selected[0]] || selected[0] || placeholder;
  // };

  return (
    <div className="flex flex-col gap-1 w-full" ref={rootRef}>
      {label && <label className="text-sm font-medium text-onSurface">{label}</label>}

      <div className="relative w-full">
        <div
          ref={triggerRef}
          className={cn(
            'border border-outline rounded-xl px-3 py-2 bg-transparent min-h-[42px] overflow-x-hidden',
            searchable ? 'cursor-text' : 'cursor-pointer',
            className
          )}
          onClick={() => {
            if (!searchable) {
              setOpen((v) => !v);
            }
          }}
        >
          <div className="flex items-center gap-2 w-full overflow-x-hidden">
            {/* Hidden measurement container for chips */}
            {multiple && !showAllSelected && (
              <div ref={chipContainerRef} className="absolute opacity-0 pointer-events-none flex gap-2 flex-wrap">
                {selected.map((val) => (
                  <div key={val} className="chip-item">
                    <Chip label={valueToLabelMap[val] || val} variant="outlined" deleteIcon />
                  </div>
                ))}
              </div>
            )}

            <div className={cn(
              "flex flex-1 items-center gap-2 min-w-0",
              multiple && !showAllSelected ? "flex-nowrap" : "flex-wrap"
            )}>
              {/* Multiple + Searchable: Chips + input */}
              {multiple && searchable ? (
                <>
                  {visibleItems.map((val) => (
                    <Chip
                      key={val}
                      label={valueToLabelMap[val] || val}
                      variant="outlined"
                      deleteIcon
                      onDelete={(e) => {
                        e.stopPropagation();
                        toggleValue(val);
                      }}
                    />
                  ))}

                  {overflowCount > 0 && (
                    <button
                      type="button"
                      className="text-sm text-onSurface/80 shrink-0 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                      }}
                    >
                      +{overflowCount} more
                    </button>
                  )}

                  {/* Dynamic width based on if there are chips */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (!open) setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={selected.length === 0 ? placeholder : ''}
                    style={{ width: selected.length === 0 ? '100%' : '80px' }}
                    className="shrink-0 min-w-0 outline-none bg-transparent text-onSurface/90"
                    onClick={(e) => e.stopPropagation()}
                  />
                </>
              ) : multiple && !searchable ? (
                <>
                  {visibleItems.length === 0 && (
                    <span className="text-onSurface/60">{placeholder}</span>
                  )}

                  {visibleItems.map((val) => (
                    <Chip
                      key={val}
                      label={valueToLabelMap[val] || val}
                      variant="outlined"
                      deleteIcon
                      onDelete={(e) => {
                        e.stopPropagation();
                        toggleValue(val);
                      }}
                    />
                  ))}

                  {overflowCount > 0 && (
                    <button
                      type="button"
                      className="text-sm text-onSurface/80 shrink-0 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                      }}
                    >
                      +{overflowCount} more
                    </button>
                  )}
                </>
              ) : !multiple && searchable ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={open ? searchTerm : (valueToLabelMap[selected[0]] || selected[0] || '')}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (!open) setOpen(true);
                  }}
                  onFocus={() => {
                    setOpen(true);
                    setSearchTerm('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 outline-none bg-transparent text-onSurface/90 w-full"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                /* Single select: Just display the selected value or placeholder */
                <div className="flex-1 truncate text-onSurface/90">
                  {selected[0] ? (valueToLabelMap[selected[0]] || selected[0]) : <span className="text-onSurface/40">{placeholder}</span>}
                </div>
              )}
            </div>

            <ChevronDownIcon className="w-5 h-5 text-onSurface shrink-0" />
          </div>
        </div>

        {/* Dropdown menu - positioned below trigger */}
        {open && (
          <Menu 
            width={'fit-parent'} 
            scrollbar 
            className="mt-1 max-h-60"
          >
            {enhancedChildren}

            {multiple && selected.length > 0 && (
              <>
                <Menu.Divider />
                <Menu.Item condensed className="text-center text-primary cursor-pointer" onClick={clearAll}>
                  Clear All
                </Menu.Item>
              </>
            )}
          </Menu>
        )}
      </div>
    </div>
  );
}