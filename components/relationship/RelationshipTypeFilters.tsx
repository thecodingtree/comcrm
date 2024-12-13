import { type RelationshipTypeFilter, TasksFilter } from '@/server/sharedTypes';

import FilterSelect from '../controls/FilterSelect';

import { RelationshipCategory, CoreEntityType } from '@prisma/client';

import { getRelationshipCategoryIcon } from './icons';
import { getEntityIcon } from '../entities/utils';

const categoryFilterItems = Object.values(RelationshipCategory).map((type) => ({
  key: type,
  icon: getRelationshipCategoryIcon({ category: type, className: 'w-5 h-5' }),
}));

const entityFilterItems = Object.values(CoreEntityType).map((entity) => ({
  key: entity,
  icon: getEntityIcon({ type: entity }),
}));

export default function RelationshipTypeFilters({
  filters,
  onFilterChange,
}: {
  filters?: RelationshipTypeFilter;
  onFilterChange: (filter?: RelationshipTypeFilter) => void;
}) {
  const handleFilterChange = (filter: RelationshipTypeFilter) => {
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-row gap-2">
        <FilterSelect
          selected={filters?.category}
          onChange={(categoryFilter) => {
            handleFilterChange({
              ...filters,
              category: categoryFilter as RelationshipCategory[],
            });
          }}
          allowMultiple
          allowNone
          items={categoryFilterItems}
        />
      </div>
      <div className="flex flex-row gap-2">
        <FilterSelect
          selected={filters?.entity}
          onChange={(entityFilter) => {
            handleFilterChange({
              ...filters,
              entity: entityFilter as CoreEntityType[],
            });
          }}
          allowMultiple
          allowNone
          items={entityFilterItems}
        />
      </div>
    </div>
  );
}
