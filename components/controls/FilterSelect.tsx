import { cn } from '@/libs/utils';

import { Button } from '@/components/ui/button';

export default function FilterSelect({
  selected,
  onChange,
  allowMultiple = false,
  allowNone = false,
  items,
}: {
  selected?: string[] | string | undefined;
  onChange: (type?: string | string[]) => void;
  allowMultiple?: boolean;
  allowNone?: boolean;
  items: { key: string; icon: React.ReactNode }[];
}) {
  const handleSelectedChange = (type: string) => {
    if (allowMultiple) {
      if (selected === undefined) {
        onChange([type]);
        return;
      }

      if (allowNone && selected?.includes(type)) {
        // Remove type from selected
        onChange((selected as string[]).filter((t) => t !== type));
      } else {
        onChange([...(selected as string[]), type]);
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

  const isSelected = (type: string) => {
    if (allowMultiple && Array.isArray(selected)) {
      return selected.includes(type);
    }
    return selected === type;
  };

  return (
    <div className="flex flex-row gap-10">
      <div className="grid grid-flow-col grid-3 gap-2">
        {items.map((item) => (
          <div key={item.key}>
            <Button
              className={cn(
                'rounded-full',
                isSelected(item.key)
                  ? `bg-slate-300 border-2 border-slate-600`
                  : null,
              )}
              size="icon"
              variant="outline"
              onClick={() => {
                handleSelectedChange(item.key);
              }}
              name={`FILTER:${item.key}`}
            >
              {item.icon}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
