import { Card, CardContent } from '@/components/ui/card';

import { type RelationshipTypeResult } from '@/server/relationship';

import {
  getRelationshipCategoryIcon,
  getDirectionIcons,
} from '../relationship/icons';

import { EditButton, DeleteButton } from '../controls/Buttons';

export default function RelationshipTypeItem({
  type,
  editable = true,
  onEditClicked,
  onDeleteClicked,
}: {
  type: RelationshipTypeResult;
  editable?: boolean;
  onEditClicked?: () => void;
  onDeleteClicked?: () => void;
}) {
  return (
    <Card>
      <CardContent className="flex flex-row gap-4 justify-between items-center p-2">
        <div className="flex flex-row gap-4 justify-start items-center">
          {getRelationshipCategoryIcon({
            category: type.category,
            className: 'w-5 h-5',
          })}
          <div className="font-semibold">{type.name}</div>
          {getDirectionIcons(type.from, type.to, type.direction)}
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="text-sm">{`${type.relationship?.length} relationship(s)`}</div>
          {editable && (
            <div>
              <EditButton onClick={onEditClicked} />
              <DeleteButton onClick={onDeleteClicked} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
