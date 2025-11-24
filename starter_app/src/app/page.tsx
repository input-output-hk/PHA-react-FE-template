'use client';
import { useEffect, useState } from 'react';
import Drawer from './components/Drawer';
import Icon from './components/Icon';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import ControlledTextField from './components/ControlledTextfield';
import UncontrolledTextField from './components/UncontrolledTextfield';
import Chip from './components/Chip';
import SearchBar from './components/SearchBox';
import Tabs from './components/Tabs';
import Dropdown from './components/DropdownMenu';
import SelectBox from './components/SelectBox';
import Menu from './components/Menu';

import { BoltIcon as Bolt } from '@heroicons/react/24/solid';
import { CheckCircleIcon as OutlineCheck } from '@heroicons/react/24/outline';
import { FunnelIcon as Filter } from '@heroicons/react/24/solid';
import { ArrowsUpDownIcon as Sort } from '@heroicons/react/24/solid';

const dropdownOptions = [ 'Option 1', 'Option 2', 'Option 3'];


const selectBoxGroupedOptions = [
  { label: 'File 1.hs', type: 'group', children: []},
  {
    label: 'File 2.hs',
    type: 'group',
    children: [
      { label: 'Property 1', value: 'f2prop1', status: 'valid' },
      { label: 'Property 2', value: 'f2prop2', status: 'undetermined' },
      { label: 'Property 3', value: 'f2prop3', status: 'undetermined' }
    ]
  },
  { label: 'File 3.hs',
    type: 'group',
    children: [
      { label: 'Property 1', value: 'f3prop1', status: 'falsified' },
      { label: 'Property 2', value: 'f3prop2', status: 'undetermined' },
      { label: 'Property 3', value: 'f3prop3', status: 'valid' }
    ]
  },
  { label: 'File 4.hs', type: 'group', children: []}
]

const flatSelectBoxOptions = [
  { label: 'Double Satisfaction', value: 'doubleSatisfaction'},
  { label: 'Unit Tests', value: 'unitTests'},
  { label: 'Crash Tolerance', value: 'crashTolerance'},
  { label: 'Large Datum Attack', value: 'largeDatumAttack'},
]

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [checkValues, setCheckValues] = useState({smallCheck: true, mediumCheck: false, disabledCheck: false});
  const [radioValues, setRadioValue] = useState({smallRadio: '1', mediumRadio: '3'});
  const [tabValues, setTabValues] = useState({defaultTab: 'Tab 1', iconTab: 'Tab 2'});
    const [sortValue, setSortValue] = useState(dropdownOptions[0]);
  const [filterValues, setFilterValues] = useState<string[]>([dropdownOptions[1]]); 

  const handleFilterSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      if (filterValues.includes(val)) {
          setFilterValues(filterValues.filter((v) => v !== val))
      } else {
          setFilterValues([...filterValues, val])
      }
  }

  const [flatSingleSelection, setFlatSingleSelection] = useState<string[]>([]);
  const [flatMultiSelection, setFlatMultiSelection] = useState<string[]>([]);
  const [searchableSingleSelection, setSearchableSingleSelection] = useState<string[]>([]);
  const [searchableMultiSelection, setSearchableMultiSelection] = useState<string[]>([]);
  const [searchableMultiCollapsed, setSearchableMultiCollapsed] = useState<string[]>([]);
  const [groupedSelection, setGroupedSelection] = useState<string[]>([]);

  
  useEffect(() => {
    console.log('Selection Changes:', {
      flatSingle: flatSingleSelection,
      flatMulti: flatMultiSelection,
      searchableSingle: searchableSingleSelection,
      searchableMulti: searchableMultiSelection,
      searchableMultiCollapsed: searchableMultiCollapsed,
      grouped: groupedSelection,
    });
  }, [
    flatSingleSelection,
    flatMultiSelection,
    searchableSingleSelection,
    searchableMultiSelection,
    searchableMultiCollapsed,
    groupedSelection,
  ]);
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-surface flex h-dvh">
      <main className="grow flex p-8">
        <Drawer open={openDrawer} className='w-72' onClose={() => setOpenDrawer(false)} position='left'>
          <Drawer.Header className='gap-x-2'>Drawer Title</Drawer.Header>
          <Drawer.Body>
            <p>This is the body of the drawer.</p>
            <p>You can put any content you like here.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outlined" content="Close" fullWidth onClick={() => setOpenDrawer(false)} />
          </Drawer.Footer>
        </Drawer>
        <div className='flex flex-col gap-4 w-[300px] items-start'>
          <Icon svg={<Bolt />} size='small' mode="fill" color="tertiary" />
          <Icon svg={<OutlineCheck />} size='medium' mode="stroke" color="tertiary" />
          <Button variant="primary" content="Open Drawer" onClick={() => setOpenDrawer(true)} />
          <Button variant="secondary" content="Click Me" shape="square" />
          <Button variant="outlined" content="Click Me" startIcon={{ svg: <Bolt /> }} />
          <Button variant="text" content="Click Me" />
          <Button variant="outlined" content="Click Me" fullWidth/>
          <Button variant="primary" shape="pill" content="Click Me" disabled endIcon={{ svg: <Bolt /> }} />
          <Button variant="icon" content={{ svg: <Bolt /> }} />
          <Checkbox label='Checkbox Label Small' size='small' checked={checkValues.smallCheck} onChange={(e) => setCheckValues({...checkValues, smallCheck: e.target.checked})} />
          <Checkbox label='Checkbox Label Medium' size='medium' checked={checkValues.mediumCheck} onChange={(e) => setCheckValues({...checkValues, mediumCheck: e.target.checked})} />
          <Checkbox label='Checkbox Label Disabled' disabled checked={checkValues.disabledCheck} onChange={(e) => setCheckValues({...checkValues, disabledCheck: e.target.checked})} />
        </div>
        <div className='flex flex-col gap-4 items-start ml-10'>
          <RadioGroup
            name="smallGroupExample"
            selectedValue={radioValues.smallRadio}
            onChange={(e) => setRadioValue({...radioValues, smallRadio: e.target.value})}
            radioButtons={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3", disabled: true},
            ]}
          />
          <RadioGroup
            name="mediumGroupExample"
            direction="row"
            selectedValue={radioValues.mediumRadio}
            onChange={(e) => setRadioValue({...radioValues, mediumRadio: e.target.value})}
            radioButtons={[
              { value: "1", label: "Option 1", size: "medium" },
              { value: "2", label: "Option 2", size: "medium" },
              { value: "3", label: "Option 3", size: "medium" },
            ]}
          />
          <ControlledTextField
            initialValue={100}
            label="Number Example"
            placeholder="Number"
            helperText="Enter a number"
            type="number"
          />
          <ControlledTextField
            label="String Example"
            placeholder="Name"
            helperText="Enter a name"
            type="text"
            required
          />
          <UncontrolledTextField
            label="Email Example"
            placeholder="example@example.com"
            helperText="Enter an email"
            type="email"
            disabled
          />
          <UncontrolledTextField
            label="Password Example"
            placeholder="1234"
            fullWidth
            helperText="Enter a password"
            type="password"
          />
          <ControlledTextField
            label="Date Example"
            placeholder="YYYY-MM-DD"
            helperText="Enter a date"
            type="date"
          />
        </div>
        <div className='flex flex-col gap-4 items-start ml-10'>
          <Chip label="Outline Chip" variant="outlined" deleteIcon startIcon={{svg: <Bolt />}} />
          <Chip label="Filled Chip" variant="filled" deleteIcon startIcon={{svg: <Bolt />}} />
          <SearchBar 
            handleClear={() => ''}
          />
          <Tabs
            activeTab={tabValues.defaultTab}
            onChange={(e) => setTabValues({...tabValues, defaultTab: e.target.id})}
            tabs={[
              { label: 'Tab 1' },
              { label: 'Tab 2' },
              { label: 'Tab 3' },
              { label: 'Tab 4' },
            ]}
          />
          <Tabs
            activeTab={tabValues.iconTab}
            onChange={(e) => setTabValues({...tabValues, iconTab: e.target.id})}
            iconVariant="stroke"
            variant="filled"
            tabs={[
              { label: 'Tab 1', icon: <Bolt /> },
              { label: 'Tab 2', icon: <Bolt /> },
              { label: 'Tab 3', icon: <Bolt /> },
              { label: 'Tab 4', icon: <Bolt /> },
            ]}
          />
          <Dropdown 
            btnLabel={filterValues.length === 0 ? "Filter" :  filterValues.length === 1 ? "Filter: " + filterValues[0] : "Filter: " + filterValues.length + " Options" }
            btnIcon={{ svg: <Filter /> }}>
            <>
            {dropdownOptions.map((i) => 
              <Menu.Item 
                  key={i}
                  className='flex justify-between'>
                  <Checkbox 
                      label={i}
                      value={i}
                      checked={filterValues.includes(i)}
                      onChange={handleFilterSelect}  
                  />
              </Menu.Item>
              )}
              <Menu.Divider />
              <Button variant="inherit" content="Clear All" onClick={() => setFilterValues([])} fullWidth className='mb-[8px]'/>
            </>
          </Dropdown>
          <Dropdown 
              btnLabel={"Sort: " + sortValue} 
              btnIcon={{ svg: <Sort /> }}>
              {dropdownOptions.map((i) => 
                <Menu.Item key={i} className='flex justify-between'>
                    <RadioGroup.Button
                        label={i}
                        value={i}
                        checked={i === sortValue}
                        onChange={() => setSortValue(i)}
                        />
                </Menu.Item>
              )}
          </Dropdown>

          {/* Flat - Single Select (Non-searchable) */}
          <SelectBox
            label="Flat - Single Select (Non-searchable) "
            placeholder="Select a property"
            multiple={false}
            onChange={setFlatSingleSelection}
          >
            {flatSelectBoxOptions.map((opt) => (
              <Menu.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Menu.Item>
            ))}
          </SelectBox>


          {/* Flat - multi-select */}
          <SelectBox
            label="Flat - multi-select"
            placeholder="Select properties"
            multiple={true}
            showAllSelected={false}
            onChange={setFlatMultiSelection}
          >
            {flatSelectBoxOptions.map((opt) => (
              <Menu.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Menu.Item>
            ))}
          </SelectBox>


          {/* Single Select - Searchable */}
          <SelectBox
            label="Single Select - Searchable"
            placeholder="Search..."
            multiple={false}
            searchable={true}
            onChange={setSearchableSingleSelection}
          >
            {flatSelectBoxOptions.map((opt) => (
              <Menu.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Menu.Item>
            ))}
          </SelectBox>

          
          {/* Multi Select - Searchable with all chips */}
          <SelectBox
            label="Multi Select - Searchable with all chips"
            placeholder="Search..."
            multiple={true}
            searchable={true}
            showAllSelected={true}
            onChange={setSearchableMultiSelection}
          >
            {flatSelectBoxOptions.map((opt) => (
              <Menu.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Menu.Item>
            ))}
          </SelectBox>

          {/* Multi Select - Searchable (showAllSelected false) */}
          {/* TBD - Fix horizontal scroll when large labels */}
          <SelectBox
            label="Multi Select - Searchable (showAllSelected false)"
            placeholder="Search..."
            multiple={true}
            searchable={true}
            showAllSelected={false}
            onChange={setSearchableMultiCollapsed}
          >
            {flatSelectBoxOptions.map((opt) => (
              <Menu.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Menu.Item>
            ))}
          </SelectBox>

          {/* Grouped Single Select */}
          <SelectBox
            label="Grouped Single Select"
            placeholder="Search..."
            multiple={false}
            searchable={true}
            onChange={setGroupedSelection}
            className="w-full"
          >
            {selectBoxGroupedOptions.map((group) => (
              <Menu.Group label={group.label} key={group.label}>
                {group.children.map((child) => (
                  <Menu.Item key={child.value} value={child.value}>
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.Group>
            ))}
          </SelectBox>

        </div>
      </main>
      </div>
  );
}
