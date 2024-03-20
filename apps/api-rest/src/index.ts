import { app } from '@api-rest/app.js';
import { config } from '@api-rest/config.js';
import { database } from '@api-rest/database.js';
import { migrateToLatest } from '@todoapp/data-access/migrations';

void migrateToLatest(database);

app.listen(config.get('port'), () => {
  process.stdout.write(
    `Server started at http://localhost:${config.get('port')}`,
  );
});
