import { config } from '@api-rest/config.js';
import { createDatabase } from '@todoapp/data-access';

export const database = createDatabase(
  config.get('database.filename'),
  config.get('database.options'),
);
