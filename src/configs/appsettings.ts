import dotenv from 'dotenv';
dotenv.config();

// Explicitly declare process type
declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

const appsettings = {
  env: process.env.ENV || 'development',
  port: process.env.PORT || 4500,
  DB: {
    username: process.env.DB_user,
    host: process.env.DB_Server,
    database: process.env.DB_database,
    password: process.env.DB_Password,
    port: process.env.DB_Port || 5432,
    synchronize: true,
    logging: false,

    dbConString:
      process.env.DB_CONSTRING ||
      'postgresql://username:pwd@localhost:5432/onaxappnode',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  functions: {
    getObjects: (filterDto: object): Record<string, unknown> => {
      const resp = Object.keys(filterDto).reduce((acc, key) => {
        if (key) {
          acc[key.toLowerCase()] = filterDto[key as keyof object];
        }
        return acc;
      }, {});
      return resp;
    },
  },
};

export default appsettings;
