import { cn } from '@/libs/utils';

import { Button } from '@/components/ui/button';

import { TaskType } from '@/server/sharedTypes';
import { getTaskIcon } from './utils';

export default function TaskTypeSelect({
  selected,
  onChange,
  allowMultiple = false,
  allowNone = false,
}: {
  selected?: TaskType[] | TaskType | undefined;
  onChange: (type?: TaskType | TaskType[]) => void;
  allowMultiple?: boolean;
  allowNone?: boolean;
}) {
  const handleSelectedChange = (type: TaskType) => {
    console.log(selected);

    if (allowMultiple) {
      if (selected === undefined) {
        onChange([type]);
        return;
      }

      if (allowNone && selected?.includes(type)) {
        // Remove type from selected
        onChange((selected as TaskType[]).filter((t) => t !== type));
      } else {
        onChange([...(selected as TaskType[]), type]);
      }
      return;
    } else if (selected === type) {
      if (allowNone) {
        onChange(undefined);
      }
      return;
    }

    onChange(type);
  };

  const isSelected = (type: TaskType) => {
    if (allowMultiple && Array.isArray(selected)) {
      return selected.includes(type);
    }
    return selected === type;
  };

  return (
    <div className="flex flex-row gap-10">
      <div className="grid grid-flow-col grid-3 gap-2">
        {Object.keys(TaskType).map((type) => (
          <div key={type}>
            <Button
              className={cn(
                'rounded-full',
                isSelected(type as TaskType)
                  ? `bg-slate-300 border-2 border-slate-600`
                  : null,
              )}
              size="icon"
              variant="outline"
              onClick={() => {
                handleSelectedChange(type as TaskType);
              }}
              name={`FILTER:${type}`}
            >
              {getTaskIcon(type as TaskType)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
