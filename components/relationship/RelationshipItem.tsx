import { Card, CardContent } from '@/components/ui/card';

import { DeleteButton } from '@/components/controls/Buttons';

import { RelationshipResult } from '@/server/relationship';

import { getEntityIcon, getEntityLink } from '@/components/entities/utils';
import { getRelationshipCategoryIcon } from './icons';

export default function RelationshipItem({
  relationship,
  onDelete,
}: {
  relationship: RelationshipResult;
  onDelete?: () => void;
}) {
  return (
    <Card>
      <CardContent className="flex flex-row gap-4 justify-between items-center p-2">
        <div className="flex flex-row items-center gap-1">
          {getRelationshipCategoryIcon({
            category: relationship.type?.category,
          })}
          <div className="font-bold">{relationship.type.name}</div>
        </div>

        <div>
          {getEntityLink({
            type: relationship.to.type,
            id: relationship.to.id,
            children: (
              <div className="flex flex-row gap-1 items-center">
                {getEntityIcon({ type: relationship.to.type })}
                {relationship.to.meta?.name}
              </div>
            ),
          })}
        </div>
        <div className="flex flex-row gap-1 items-center">
          <DeleteButton onClick={onDelete} />
        </div>
      </CardContent>
    </Card>
  );
}
