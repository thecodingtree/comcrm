import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const TeamInviteMember = ({
  email,
  invitedByEmail,
  teamName,
  inviteLink,
}: {
  email: string;
  invitedByEmail?: string;
  teamName?: string;
  inviteLink?: string;
}) => {
  const previewText = `Join ${teamName} on ComCRM!`;

  const body = (
    <Body className="bg-white my-auto mx-auto font-sans px-2">
      <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
        <Section className="mt-[32px]">
          {/* <Img
        src={``}
        width="40"
        height="37"
        alt="Vercel"
        className="my-0 mx-auto"
      /> */}
        </Section>
        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
          Join <strong>{teamName}</strong> on <strong>ComCRM</strong>
        </Heading>
        <Text className="text-black text-[14px] leading-[24px]">
          Hello {email},
        </Text>
        <Text className="text-black text-[14px] leading-[24px]">
          <Link
            href={`mailto:${invitedByEmail}`}
            className="text-blue-600 no-underline"
          >
            {invitedByEmail}
          </Link>
          has invited you to the <strong>{teamName}</strong> team on{' '}
          <strong>ComCRM</strong>.
        </Text>
        <Section className="text-center mt-[32px] mb-[32px]">
          <Button
            className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
            href={inviteLink}
          >
            Join the team
          </Button>
        </Section>
        <Text className="text-black text-[14px] leading-[24px]">
          or copy and paste this URL into your browser:{' '}
          <Link href={inviteLink} className="text-blue-600 no-underline">
            {inviteLink}
          </Link>
        </Text>
        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
      </Container>
    </Body>
  ) as React.ReactNode;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>{body}</Tailwind>
    </Html>
  );
};

export default TeamInviteMember;
