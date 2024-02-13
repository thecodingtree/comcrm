import { TasksFilter } from '@/server/sharedTypes';

import TaskTypeSelect from './TaskTypeSelect';

export default function TaskFilters({
  filters,
  onFilterChange,
}: {
  filters?: TasksFilter;
  onFilterChange: (filter?: TasksFilter) => void;
}) {
  const handleFilterChange = (filter: TasksFilter) => {
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-row gap-10">
      <div className="grid grid-flow-col grid-3 gap-2">
        <TaskTypeSelect
          selected={filters?.type}
          onChange={(typeFilter) => {
            console.log('typeFilter', typeFilter);
            handleFilterChange({
              ...filters,
              type: typeFilter,
            });
          }}
          allowMultiple
          allowNone
        />
      </div>
    </div>
  );
}
