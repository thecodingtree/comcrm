import { SendVerificationRequestParams } from 'next-auth/providers/email';
import { resend } from '@/resend';

import { SendVerificationEmail } from '@/react-email-starter/emails/send-verfication';

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  try {
    console.log('Sending Email!', params);
    const response = await resend.emails.send({
      from: process.env.DEFAULT_EMAIL_FROM!,
      to: params.identifier,
      subject: 'Sign in to ComCRM',
      react: (
        <SendVerificationEmail url={params?.url} email={params.identifier} />
      ),
    });
    console.log({ response });
  } catch (error) {
    console.log({ error });
  }
};
