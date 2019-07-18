
export interface IConfig {
  port: number;
  prettyLog: boolean;
  dbPath: string;
}

const config: IConfig = {
  port: Number(process.env.NODE_PORT) || 3000,
  prettyLog: process.env.NODE_ENV == 'development',
  dbPath: 'mongodb://localhost/notes-redactor',
};

export { config };
