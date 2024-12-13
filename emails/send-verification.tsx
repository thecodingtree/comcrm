//import { resend } from '@/resend';

export const sendVerificationRequest = async (params: {
  identifier: string;
  url: string;
}) => {
  try {
    console.log('Sending Email!', params);
    // const response = await resend.emails.send({
    //   from: process.env.DEFAULT_EMAIL_FROM!,
    //   to: params.identifier,
    //   subject: 'Sign in to ComCRM',
    //   text: `Click the link below to sign in to ComCRM: ${params.url}`,
    //   // react: (
    //   //   <SendVerificationEmail url={params?.url} email={params.identifier} />
    //   // ),
    // });
    // console.log({ response });
  } catch (error) {
    console.log({ error });
  }
};
