import TeamUsers from '@/components/team/TeamUsers';

import { getTeam } from '@/server/team';
import { getEnhancedDB } from '@/server/db';

export default async function Team() {
  const team = await getTeam({ db: await getEnhancedDB() });

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-flow-row gap-10">
      <div className="text-5xl font-bold">{team.name}</div>
      <div>
        <TeamUsers teamId={team.id} />
      </div>
    </div>
  );
}
