import { createConfig } from 'express-zod-api';

const port = process.env.PORT || 3000;

export const config = createConfig({
  cors: ({ defaultHeaders }) => {
    console.log({ defaultHeaders });

    return {
      ...defaultHeaders,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*',
    };
  },
  logger: {
    color: true,
    level: 'debug',
  },
  server: {
    listen: port, // port, UNIX socket or options
  },
  startupLogo: false,
});
