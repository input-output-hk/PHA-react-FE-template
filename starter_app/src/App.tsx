'use client';
import { useState } from 'react';
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
import { BoltIcon as Bolt } from '@heroicons/react/24/solid';
import { CheckCircleIcon as OutlineCheck } from '@heroicons/react/24/outline';
import { FunnelIcon as Filter } from '@heroicons/react/24/solid';
import { ArrowsUpDownIcon as Sort } from '@heroicons/react/24/solid';

const dropdownOptions = [
    { itemLabel: 'Option 1', value: 'option1', suffixText: '34' },
    { itemLabel: 'Option 2', value: 'option2', suffixText: '34' },
    { itemLabel: 'Option 3', value: 'option3', suffixText: '34' },
  ]

export default function App() {
  const [checkValues, setCheckValues] = useState({smallCheck: true, mediumCheck: false, disabledCheck: false});
  const [radioValues, setRadioValue] = useState({smallRadio: '1', mediumRadio: '3'});
  const [tabValues, setTabValues] = useState({defaultTab: 'Tab 1', iconTab: 'Tab 2'});
  const [sortValue, setSortValue] = useState('option1');
  const [filterValues, setFilterValues] = useState<string[]>(['option2']); 

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-surface flex h-dvh">
      <main className="grow flex p-8">
        <div className='flex flex-col gap-4 w-[300px] items-start'>
          <Icon svg={<Bolt />} size='small' mode="fill" color="tertiary" />
          <Icon svg={<OutlineCheck />} size='medium' mode="stroke" color="tertiary" />
          <Button variant="primary" content="Click Me" />
          <Button variant="secondary" content="Click Me" shape="square" />
          <Button variant="outlined" content="Click Me" startIcon={{ svg: <Bolt /> }} />
          <Button variant="text" content="Click Me" />
          <Button variant="outlined" content="Click Me" fullWidth/>
          <Button variant="primary" shape="pill" content="Click Me" disabled endIcon={{ svg: <Bolt /> }} />
          <Button variant="icon" content={{ svg: <Bolt /> }} />
          <Checkbox label='Checkbox Label Small' size='small' checked={checkValues.smallCheck} onChange={(e) => setCheckValues({ ...checkValues, smallCheck: e.target.checked })} />
          <Checkbox label='Checkbox Label Medium' size='medium' checked={checkValues.mediumCheck} onChange={(e) => setCheckValues({ ...checkValues, mediumCheck: e.target.checked })} />
          <Checkbox label='Checkbox Label Disabled' disabled checked={checkValues.disabledCheck} onChange={(e) => setCheckValues({ ...checkValues, disabledCheck: e.target.checked })} />
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
            btnLabel="Filter" 
            btnIcon={{ svg: <Filter /> }} 
            listItems={dropdownOptions} 
            type='checkbox' 
            selected={filterValues}
            onChange={(val) => setFilterValues(val as string[])} 
        />
        <Dropdown 
            btnLabel="Sort" 
            btnIcon={{ svg: <Sort /> }} listItems={dropdownOptions} 
            type='radio' 
            selected={sortValue}
            onChange={(val) => setSortValue(val as string)}
        />
        </div>
      </main>
      </div>
  );
}