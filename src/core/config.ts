
export interface IConfig {
  host: string;
  port: number;
  prettyLog: boolean;
  dbPath: string;
  userAvatarPath: string
}

const config: IConfig = {
  host: '10.0.0.100',
  port: Number(process.env.NODE_PORT) || 3000,
  prettyLog: process.env.NODE_ENV == 'development',
  dbPath: 'mongodb://localhost/chat',
  userAvatarPath: '/assets/avatars/'
};

export { config };
