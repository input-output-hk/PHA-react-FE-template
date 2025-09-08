"use client";

import Icon from './components/Icon';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
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
          <Checkbox label='Checkbox Label' size='small'/>
          <Checkbox label='Checkbox Label' size='medium'/>
          <Checkbox label='Checkbox Label' disabled />
          <Dropdown label="Filter" startIcon={{ svg: <Bolt /> }} options={dropdownOptions} multi={true} onChange={(changes) => onDropdownChange(changes)}/>

        </div>
        <div>
        </div>
      </main>
      </div>
  );
}
