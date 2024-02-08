import { resend } from '@/resend';

import { TeamInviteMember } from '@/react-email-starter/emails/team-invite-member';

import { TeamInvite } from '@/server/sharedTypes';

export const sendTeamInvite = async (
  invite: TeamInvite,
  inviteFromEmail: string,
) => {
  const inviteLink = `${process.env.NEXT_PUBLIC_URL}/team/${invite.team.slug}/join?token=${invite.token}`;

  try {
    console.log('Sending Invite!', invite);
    const response = await resend.emails.send({
      from: process.env.DEFAULT_EMAIL_FROM!,
      to: invite.email,
      subject: 'You have been invited to join a team on ComCRM!',
      react: (
        <TeamInviteMember
          email={invite.email}
          teamName={invite.team.name}
          inviteLink={inviteLink}
          invitedByEmail={inviteFromEmail}
        />
      ),
    });
    console.log({ response });
  } catch (error) {
    console.log({ error });
  }
};
