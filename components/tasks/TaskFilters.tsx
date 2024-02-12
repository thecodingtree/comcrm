import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { IconCall, IconEvent, IconTodo } from './icons';

export default function TaskFilters() {
  const [filter, setFilter] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-row">
      <div>
        <Button className="rounded-full" size="icon" variant="outline">
          <IconCall className="w-4 h-4" />
          <span className="sr-only">Filter: Call</span>
        </Button>
      </div>
      <div>
        <Button className="rounded-full" size="icon" variant="outline">
          <IconEvent className="w-4 h-4" />
          <span className="sr-only">Filter: Event</span>
        </Button>
      </div>
      <div>
        <Button className="rounded-full" size="icon" variant="outline">
          <IconTodo className="w-4 h-4" />
          <span className="sr-only">Filter: Todo</span>
        </Button>
      </div>
    </div>
  );
}
