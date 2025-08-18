import Icon from './components/Icon';
import Button from './components/Button';
import { BoltIcon as Bolt } from '@heroicons/react/24/solid';
import { CheckCircleIcon as OutlineCheck } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-surface">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-[400px]">
      <Icon svg={<Bolt />} size='small' mode="fill" color="tertiary" />
      <Icon svg={<OutlineCheck />} size='medium' mode="stroke" color="tertiary" />
      <Button variant="primary" content="Click Me" />
      <Button variant="secondary" content="Click Me" shape="square" />
      <Button variant="outlined" content="Click Me" startIcon={{ svg: <Bolt /> }} />
      <Button variant="text" content="Click Me" />
      <Button variant="outlined" content="Click Me" fullWidth/>
      <Button variant="primary" shape="pill" content="Click Me" disabled endIcon={{ svg: <Bolt /> }} />
      <Button variant="icon" content={{ svg: <Bolt /> }} />
      </main>
      </div>
  );
}
