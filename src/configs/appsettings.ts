// Explicitly declare process type
declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

const appsettings = {
  port: process.env.PORT || 4500,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

export default appsettings;
