import Icon from './components/Icon';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import { BoltIcon as Bolt } from '@heroicons/react/24/solid';
import { CheckCircleIcon as OutlineCheck } from '@heroicons/react/24/outline';

export default function Home() {
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
        </div>
      </main>
      </div>
  );
}
