import React, {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
  } from "react";
  import { ChevronDownIcon as ChevronDown } from '@heroicons/react/24/solid';
import Chip from "./Chip";


  //flat options
  interface Option {
    label: string;
    value: string;
    type?: "standard";
    status?: "passed" | "failed" | "pending";
  }
  
  //Group of options
  interface GroupOption {
    label: string;
    type: "group";
    children: Option[];
  }
  
  /** Union type for the options array input. so that we can support both flat and grouped options */
  export type SelectOption = Option | GroupOption;
  
  interface SelectProps {
    options: SelectOption[];
    placeholder?: string;
    search?: boolean;
    multiSelect?: boolean;
    showAllSelected?: boolean;
    onChange: (values: string[]) => void;
  }
  
  const Select: React.FC<SelectProps> = ({
    options: initialOptions,
    placeholder = "Select",
    search = false,
    multiSelect = false,
    showAllSelected = false,
    onChange = () => {},
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedValues, setSelectedValues] = useState<string[]>([]); // values of slected options
    const [visibleChipCount, setVisibleChipCount] = useState<number>(0); // For +N more logic in multi-select mode
  
    const componentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chipsContainerRef = useRef<HTMLDivElement>(null);
  
    const theme = {
      textOnSurface: "text-gray-900 dark:text-gray-100",
      bgContainer: "bg-white dark:bg-gray-700",
      bgContainerHigh: "bg-gray-100 dark:bg-gray-800",
      borderOutline: "border-gray-300 dark:border-gray-600",
      inputStyle:
        "flex items-center min-h-10 w-full rounded-md border px-4 py-2 cursor-pointer transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-blue-500",
      dropdownStyle:
        "absolute z-30 mt-1 w-full rounded-md shadow-xl max-h-60 overflow-y-auto",
      listItemStyle:
        "px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-100",
    };
  
    // Effect for click outside logic
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          componentRef.current &&
          !componentRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    // parent component listener for selection changes
    useEffect(() => {
      onChange(selectedValues);
    }, [selectedValues, onChange]);
  
    // --- Filtering Logic ---
    const flattenedOptions = useMemo<Option[]>(() => {
      // all options flattened into a single array for easy searching
      return initialOptions.flatMap((item) =>
        (item as GroupOption).type === "group" && (item as GroupOption).children
          ? (item as GroupOption).children.map((child) => ({
              ...child,
              groupLabel: item.label,
            }))
          : item.type !== "group"
          ? [item as Option]
          : []
      );
    }, [initialOptions]);
  
    const filteredOptions = useMemo<SelectOption[]>(() => {
      if (!searchValue) return initialOptions;
  
      const lowerSearch = searchValue.toLowerCase();
  
      // Recursive filtering function to handle group and flat options
      const filterItem = (item: SelectOption): SelectOption | null => {
        if (item.type === "group") {
          // Group: filter children
          const groupItem = item as GroupOption;
          const filteredChildren = groupItem.children.filter((child) =>
            child.label.toLowerCase().includes(lowerSearch)
          );
          // Only return the group if it has matching children
          return filteredChildren.length > 0
            ? { ...groupItem, children: filteredChildren }
            : null;
        }
        // Standard flat option check
        const standardItem = item as Option;
        return standardItem.label.toLowerCase().includes(lowerSearch)
          ? standardItem
          : null;
      };
  
      return initialOptions.map(filterItem).filter(Boolean) as SelectOption[];
    }, [initialOptions, searchValue]);
  
    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
      // Clear search value when closing
      if (isOpen) setSearchValue("");
  
      // Focus input when opening and searchable
      if (!isOpen && search && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [isOpen, search]);
  
    const handleSelect = useCallback(
      (value: string) => {
        // Hope you understand this logic
        setSelectedValues((prev) => {
          let newValues: string[];
          if (multiSelect) {
            newValues = prev.includes(value)
              ? prev.filter((v) => v !== value) // Remove
              : [...prev, value]; // Add
          } else {
            newValues = [value];
            setIsOpen(false);
          }
          return newValues;
        });
        setSearchValue("");
      },
      [multiSelect]
    );
  
    const handleRemoveChip = useCallback((value: string) => {
      setSelectedValues((prev) => {
        const newValues = prev.filter((v) => v !== value);
        return newValues;
      });
    }, []);
  
    // Memoized array of selected option objects for rendering chips and input display
    const allSelectedItems = useMemo<Option[]>(
      () =>
        selectedValues
          .map((v) => flattenedOptions.find((o) => o.value === v))
          .filter(Boolean) as Option[],
      [selectedValues, flattenedOptions]
    );
  
    // Effect to manage visible chip count based on container width and showAllSelected prop
    useEffect(() => {
      if (showAllSelected || !multiSelect || !chipsContainerRef.current) {
        setVisibleChipCount(allSelectedItems.length);
        return;
      }
  
      const checkOverflow = () => {
        // In a dynamic container, we use a simple heuristic for responsive estimation.
        // If we have more than 2 chips, we show 2 and the overflow counter.
        if (allSelectedItems.length > 2) {
          setVisibleChipCount(2);
        } else {
          setVisibleChipCount(allSelectedItems.length);
        }
      };
  
      // Use a delay for DOM layout stability
      const timer = setTimeout(checkOverflow, 50);
      window.addEventListener("resize", checkOverflow);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", checkOverflow);
      };
    }, [allSelectedItems.length, multiSelect, showAllSelected]);
  
    const renderChip = (item: Option) => (
        <span key={item.value}>
            <Chip 
                label={item.label}
                variant="filled"
                deleteIcon
                onDelete={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(item.value);
                }} 
            />
        </span>
    );
  
    const renderChipsAndInput = () => {
      const selectedCount = allSelectedItems.length;
      const placeholderVisible = selectedCount === 0 && !searchValue;
  
      if (!multiSelect) {
        const selectedItem = allSelectedItems[0];
        let inputDisplayValue = "";
        if (isOpen && search) {
          inputDisplayValue = searchValue; // Show search input when open and searchable
        } else if (selectedItem) {
          inputDisplayValue = selectedItem.label; // Show selected label when closed
        }
  
        return (
          <input
            ref={inputRef}
            type="text"
            value={inputDisplayValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOpen) setIsOpen(true);
            }}
            placeholder={placeholderVisible ? placeholder : ""}
            readOnly={!search || (!isOpen && !!selectedItem)}
            className={`flex-grow border-none focus:ring-0 focus:outline-none bg-transparent py-1  w-full min-w-[50px]
                ${theme.textOnSurface} ${!inputDisplayValue && placeholderVisible ? "text-gray-500" : ""}
                ${search ? "cursor-text" : "cursor-pointer"}
            `}
          />
        );
      }
  
      const visibleItems =
        showAllSelected || visibleChipCount === selectedCount
          ? allSelectedItems
          : allSelectedItems.slice(0, visibleChipCount);
  
      const overflowCount = selectedCount - visibleItems.length;
  
      return (
        <div
          ref={chipsContainerRef}
          className={`flex flex-wrap items-center flex-grow overflow-hidden ${
            showAllSelected ? "h-auto max-h-none" : "max-h-10"
          }`}
        >
          {visibleItems.map(renderChip)}
          {overflowCount > 0 && (
            <Chip 
                label={" +" + overflowCount + " more"}
                variant="filled"
              />
          )}
          {(search || placeholderVisible) && (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={(e) => {
                e.stopPropagation(); // Stop parent click from handling toggle
                if (!isOpen) setIsOpen(true);
              }}
              placeholder={placeholderVisible ? placeholder : ""}
              className={`flex-grow border-none focus:ring-0 focus:outline-none bg-transparent py-1 ${
                theme.textOnSurface
              } ${placeholderVisible ? "w-full" : "w-auto min-w-[50px]"}`}
              // Added min-width for placeholder/search input to prevent collapse
            />
          )}
        </div>
      );
    };
  
    const renderDropdownContent = () => {
      if (filteredOptions.length === 0) {
        return (
          <div className={`px-4 py-3 text-sm italic ${theme.textOnSurface}`}>
            No options found.
          </div>
        );
      }
  
      return filteredOptions.map((item) => {
        // checking if item is a group
        if (item.type === "group") {
          const groupItem = item as GroupOption;
          // Hierarchical Group Header (Not selectable, only displays text)
          return (
            <div key={groupItem.label} className="py-1">
              <div
                className={`px-4 py-2 text-sm font-semibold ${theme.bgContainerHigh} ${theme.textOnSurface}`}
              >
                {groupItem.label}
              </div>
              {/* Divider */}
              <div className={`border-t ${theme.borderOutline}`}></div>
              {/* Render subcategories (Selectable) */}
              {groupItem.children.map((child: Option) => {
                const isSelected = selectedValues.includes(child.value);
                return (
                  <div
                    key={child.value}
                    className={`${theme.listItemStyle} ${
                      isSelected ? "bg-blue-100 dark:bg-blue-800 font-medium" : ""
                    } ${theme.textOnSurface}`}
                    onClick={() => handleSelect(child.value)}
                  >
                    {child.label}
                  </div>
                );
              })}
            </div>
          );
        } else {
          // Standard selectable option (no 'type: group' property)
          const standardItem = item as Option;
          const isSelected = selectedValues.includes(standardItem.value);
          return (
            <div
              key={standardItem.value}
              className={`${theme.listItemStyle} ${
                isSelected ? "bg-blue-100 dark:bg-blue-800 font-medium" : ""
              } ${theme.textOnSurface}`}
              onClick={() => handleSelect(standardItem.value)}
            >
              {standardItem.label}
            </div>
          );
        }
      });
    };
  
    return (
      <div ref={componentRef} className="relative w-full font-inter">
        <div
          className={`${theme.inputStyle} ${theme.borderOutline} ${
            theme.textOnSurface
          } ${isOpen ? "ring-2 ring-blue-500" : ""}`}
          onClick={handleToggle}
        >
          {renderChipsAndInput()}
  
          <div
            className={`ml-2 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            } ${theme.textOnSurface}`}
          >
            <ChevronDown />
          </div>
        </div>
  
        {isOpen && (
          <div
            className={`${theme.dropdownStyle} ${theme.bgContainer} ${theme.borderOutline} border`}
          >
            {renderDropdownContent()}
          </div>
        )}
      </div>
    );
  };
  export default Select;