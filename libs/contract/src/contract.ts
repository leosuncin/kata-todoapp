import { initContract } from '@ts-rest/core';

import { authRoutes } from '@contract/auth.js';
import { taskRoutes } from '@contract/task.js';

const { router } = initContract();

export const contract = router({
  auth: authRoutes,
  task: taskRoutes,
});
