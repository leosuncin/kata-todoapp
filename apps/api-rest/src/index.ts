import { app } from '@api-rest/app.js';
import { config } from '@api-rest/config.js';

app.listen(config.get('port'), () => {
  process.stdout.write(
    `Server started at http://localhost:${config.get('port')}`,
  );
});
