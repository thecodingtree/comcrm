import { TasksFilter } from '@/server/sharedTypes';

import FilterSelect from '../controls/FilterSelect';

import { TaskType } from '@/server/sharedTypes';

import { getTaskIcon } from '@/components/tasks/utils';

const filterItems = Object.values(TaskType).map((type) => ({
  key: type,
  icon: getTaskIcon(type),
}));

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
        <FilterSelect
          selected={filters?.type}
          onChange={(typeFilter) => {
            handleFilterChange({
              ...filters,
              type: typeFilter as TaskType,
            });
          }}
          allowMultiple
          allowNone
          items={filterItems}
        />
      </div>
    </div>
  );
}
