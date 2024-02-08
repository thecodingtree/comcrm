import { type NextRequest } from 'next/server';

import { getZenstackPrisma } from '@/zenstack/utils';
import prisma from '@/prisma/client';
import { getAuthedServerSession } from '@/server/utils';

import { getTeamInvite, deleteTeamInvite, addUserToTeam } from '@/server/team';
import { redirect } from 'next/navigation';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const session = await getAuthedServerSession();

  //const db = getZenstackPrisma(prisma, session);
  // TODO: for now, we're just using the prisma instance directly because the enhanced prisma instance fails to lookup the invite (even though it should)
  const db = prisma;

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  // This path is only accessible to authenticated users
  // Invites can only be accepted by the user (verified by email) they were sent to
  const email = session?.user?.email;

  const invite = await getTeamInvite({
    db,
    filter: {
      teamSlug: params?.slug,
      token: token ?? undefined,
      email: email ?? undefined,
    },
  });

  if (invite) {
    try {
      // Remove the invite
      await deleteTeamInvite({ db, id: invite.id });

      // Add the user to the team
      await addUserToTeam({
        db,
        teamId: invite.teamId,
        userId: session?.user?.id!,
        role: invite.role,
      });
    } catch (error) {
      console.log('Error adding user to team', error);
      redirect('/dashboard/home');
    }
  } else {
    console.log(`No invite found for user: ${email} and team: ${params?.slug}`);
    redirect('/dashboard/home');
  }

  // User added to team, redirect to the team dashboard
  redirect('/dashboard/team/');
}
