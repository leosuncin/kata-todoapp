import { initContract } from '@ts-rest/core';

import { authRoutes } from '@contract/auth.js';

const { router } = initContract();

export const contract = router({
  auth: authRoutes,
});
