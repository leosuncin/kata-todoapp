import convict from 'convict';

export const config = convict({
  database: {
    filename: {
      default: 'todoapp.db',
      doc: 'The database file.',
    },
    options: {
      fileMustExist: {
        default: false,
        doc: 'Throw an error if the database file does not exist.',
        format: Boolean,
      },
      readonly: {
        default: false,
        doc: 'Open the database in readonly mode.',
        format: Boolean,
      },
    },
  },
  env: {
    default: 'development',
    doc: 'The application environment.',
    env: 'NODE_ENV',
    format: ['production', 'development', 'test'],
  },
  port: {
    arg: 'port',
    default: 3_000,
    doc: 'The port to bind.',
    env: 'PORT',
    format: 'port',
  },
});

try {
  config.loadFile('config.local.json');
} catch {
  // Do nothing
}

config.validate({ allowed: 'strict' });
