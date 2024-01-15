import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
  // config: {
  //   callbackUrl: `${process.env.NEXT_PUBLIC_URL}/api/uploadthing/`,
  // },
});
