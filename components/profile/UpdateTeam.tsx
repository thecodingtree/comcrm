'use client';

import Link from 'next/link';

import SettingCard from '@/components/common/SettingCard';
import { Button } from '@/components/ui/button';

import { trpc } from '@/app/_trpc/client';
import { TeamRole } from '@prisma/client';

import { toast } from 'sonner';

export default function UpdateTeam() {
  const { data, isLoading, refetch } = trpc.team.getTeamUser.useQuery();
  const leaveTeam = trpc.team.leaveTeam.useMutation();

  const teamRoleLabel = (role: TeamRole | undefined) => {
    switch (role) {
      case TeamRole.ADMIN:
        return 'an admin';
      case TeamRole.OWNER:
        return 'the owner';
      default:
        return 'a member';
    }
  };

  const teamName = data?.team?.name;
  const teamId = data?.team?.id;
  const teamRole = data?.role;

  return (
    <SettingCard title="Team">
      <div>
        {data ? (
          <div className="flex flex-col gap-4">
            <div>
              {'You are '}
              <span className="font-bold">{teamRoleLabel(teamRole)}</span>{' '}
              {' of '} <span className="italic">team </span>
              <span className="italic text-lg font-bold">{teamName}</span>
            </div>
            <div>
              {' '}
              <Button
                onClick={() =>
                  leaveTeam.mutate(
                    { teamId: teamId! },
                    {
                      onSuccess: () => {
                        refetch();
                        toast.success(`Successfully left team ${teamName}`);
                      },
                    },
                  )
                }
              >
                leave team
              </Button>
            </div>
          </div>
        ) : (
          <div>
            You have not joined a team yet. Go to your{' '}
            <Link href="/team" className="font-bold">
              Team
            </Link>{' '}
            page to create or join a team.
          </div>
        )}
      </div>
    </SettingCard>
  );
}
