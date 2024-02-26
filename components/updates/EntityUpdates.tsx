import { Separator } from '@/components/ui/separator';

import NotesBrief from '@/components/updates/NotesBrief';
import TasksBrief from '@/components/updates/TasksBrief';

export default function EntityUpdates({
  entityId,
}: {
  entityId?: string | undefined;
}) {
  return (
    <div className="flex-1 flex flex-row p-4 gap-1">
      <div className="flex-1">
        {entityId && <NotesBrief entityId={entityId} />}
      </div>
      <div>
        <Separator orientation="vertical" />
      </div>
      <div className="flex-1">
        {entityId && <TasksBrief entityId={entityId} />}
      </div>
    </div>
  );
}
