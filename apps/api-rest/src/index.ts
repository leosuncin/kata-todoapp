import { app } from '@api-rest/app.js';

const port = 3_000;

app.listen(port, () => {
  process.stdout.write(`Server started at http://localhost:${port}`);
});
