export const config = {
  // ✅ Database configuration
  username: process.env.POSTGRES_USERNAME || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || '',
  host: process.env.POSTGRES_HOST || '',
  dialect: 'postgres',

  // ✅ AWS configuration
  aws: {
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    profile: process.env.AWS_PROFILE || 'default',
    mediaBucket: process.env.AWS_MEDIA_BUCKET || '',
  },

  // ✅ App configuration
  url: process.env.URL || 'http://localhost:8100',
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },

  // ✅ Dev/Test overrides
  ...(process.env.NODE_ENV === 'test' && {
    storage: ':memory:',
    logging: false,
  }),
};

