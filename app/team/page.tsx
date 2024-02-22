import { TeamRole } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import TeamUsers from '@/components/team/TeamUsers';
import TeamInvites from '@/components/team/TeamInvites';
import CreateTeamDialog from '@/components/team/CreateTeamDialog';

import { getTeamUser } from '@/server/team';
import { getEnhancedDB } from '@/server/db';
import { getAuthedServerSession } from '@/server/utils';

export default async function Team() {
  const session = await getAuthedServerSession();
  const teamUser = await getTeamUser({
    db: await getEnhancedDB(session!),
    user: session!.user?.id!,
  });

  const canAdminTeam = teamUser?.role !== TeamRole.MEMBER;

  return (
    <div className="grid grid-flow-row gap-10">
      {teamUser ? (
        <div className="grid grid-flow-row gap-1">
          <div className="text-2xl font-light">Team</div>
          <div className="text-5xl font-bold uppercase">
            {teamUser?.team?.name}
          </div>
        </div>
      ) : (
        <div>
          <CreateTeamDialog />
        </div>
      )}
      <div>
        {teamUser ? (
          <Tabs defaultValue="members">
            {canAdminTeam && (
              <TabsList className="grid w-full grid-cols-2 bg-black text-white">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="invites">Invites</TabsTrigger>
              </TabsList>
            )}
            <TabsContent value="members">
              <TeamUsers teamId={teamUser?.team?.id} canAdminTeam />
            </TabsContent>
            <TabsContent value="invites">
              <TeamInvites team={teamUser?.team?.id} canAdminTeam />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-flow-row gap-4">
            <div className="text-2xl font-light">Invites</div>
            <div>
              <TeamInvites email={session?.user?.email ?? undefined} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
