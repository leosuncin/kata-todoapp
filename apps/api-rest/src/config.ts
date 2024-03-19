import convict from 'convict';

export const config = convict({
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
