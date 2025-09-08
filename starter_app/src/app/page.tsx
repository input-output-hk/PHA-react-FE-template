"use client";

import Icon from './components/Icon';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import ControlledTextField from './components/ControlledTextfield';
import UncontrolledTextField from './components/UncontrolledTextfield';
import Chip from './components/Chip';
import SearchBar from './components/SearchBox';
import Tabs from './components/Tabs';
import { BoltIcon as Bolt } from '@heroicons/react/24/solid';
import { CheckCircleIcon as OutlineCheck } from '@heroicons/react/24/outline';
import Dropdown from './components/Dropdown';

export default function Home() {
  const dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]
  
  const onDropdownChange = (selected: string[] | string | null) => {
    console.log('Selected:', selected);
  }

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
          <Checkbox label='Checkbox Label Small' size='small'/>
          <Checkbox label='Checkbox Label Medium' size='medium'/>
          <Checkbox label='Checkbox Label Disabled' disabled />
          
          <Dropdown label="Filter" startIcon={{ svg: <Bolt /> }} options={dropdownOptions} multi={true} onChange={(changes) => onDropdownChange(changes)}/>

        </div>
        <div className='flex flex-col gap-4 items-start ml-10'>
          <RadioGroup
            radioButtons={[
              { name: "example", value: "1", label: "Option 1", defaultChecked: true },
              { name: "example", value: "2", label: "Option 2" },
              { name: "example", value: "3", label: "Option 3" },
            ]}
          />
          <RadioGroup
            direction="row"
            size="medium"
            radioButtons={[
              { name: "example", value: "1", label: "Option 1", defaultChecked: true },
              { name: "example", value: "2", label: "Option 2" },
              { name: "example", value: "3", label: "Option 3" },
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
          <SearchBar />
          <Tabs
            tabs={[
              { label: 'Tab 1' },
              { label: 'Tab 2' },
              { label: 'Tab 3' },
              { label: 'Tab 4' },
            ]}
          />

          <Tabs
            variant="filled"
            tabs={[
              { label: 'Tab 1', icon: <Bolt /> },
              { label: 'Tab 2', icon: <Bolt /> },
              { label: 'Tab 3', icon: <Bolt /> },
              { label: 'Tab 4', icon: <Bolt /> },
            ]}
          />
        </div>
      </main>
      </div>
  );
}
