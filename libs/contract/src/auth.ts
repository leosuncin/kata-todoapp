import {
  Login,
  Register,
  UpdateUser,
  UserWithoutPassword as User,
} from '@todoapp/schemas';
import { initContract } from '@ts-rest/core';

const { router } = initContract();

export const authRoutes = router(
  {
    loginUser: {
      method: 'POST',
      path: '/login',
      body: Login,
      responses: {
        200: User,
      },
      summary: 'Log in a user',
      description: 'Log in a user with their username and password',
    },
    registerUser: {
      method: 'POST',
      path: '/register',
      body: Register,
      responses: {
        200: User,
      },
      summary: 'Register a new user',
      description: 'Register a new user with an username and password',
    },
    updateMe: {
      method: 'PUT',
      path: '/me',
      body: UpdateUser,
      responses: {
        200: User,
      },
      summary: 'Update the current user',
      description: 'Update the current user with new information',
      metadata: {
        authenticated: true,
      } as const,
    },
  },
  {
    pathPrefix: '/auth',
    strictStatusCodes: true,
    validateResponseOnClient: true,
  },
);
