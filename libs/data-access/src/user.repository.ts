import { sql } from 'kysely';

import { Connection } from '@data-access/database.js';
import { pika } from '@data-access/id.js';
import {
  CreateUser,
  UpdateUser,
  User,
  UserWithoutPassword,
} from '@data-access/user.table.js';

type FilterUsers = Partial<{
  offset: number;
  limit: number;
}>;

const aliases = [
  'user_id as id',
  'user_username as username',
  'user_bio as bio',
  'user_created_at as createdAt',
  'user_updated_at as updatedAt',
] as const;

export class UserRepository {
  constructor(private readonly connection: Connection) {}

  createUser({
    username: user_username,
    password: user_password,
    bio: user_bio,
  }: CreateUser): Promise<UserWithoutPassword> {
    return this.connection
      .insertInto('users')
      .values({
        user_id: pika.gen('user'),
        user_username,
        user_password,
        user_bio,
      })
      .returning(aliases)
      .executeTakeFirstOrThrow();
  }

  getUsers({ offset = 0, limit = 10 }: FilterUsers = {}): Promise<
    UserWithoutPassword[]
  > {
    return this.connection
      .selectFrom('users')
      .select(aliases)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.connection
      .selectFrom('users')
      .select([...aliases, 'user_password as password'])
      .where('user_username', '=', username)
      .executeTakeFirst();
  }

  updateUserByUsername(
    username: string,
    { bio: user_bio, password: user_password }: Omit<UpdateUser, 'username'>,
  ): Promise<UserWithoutPassword | undefined> {
    return this.connection
      .updateTable('users')
      .set({
        user_bio,
        user_password,
        user_updated_at: sql`CURRENT_TIMESTAMP`,
      })
      .where('user_username', '=', username)
      .returning(aliases)
      .executeTakeFirst();
  }

  deleteUserByUsername(
    username: string,
  ): Promise<UserWithoutPassword | undefined> {
    return this.connection
      .deleteFrom('users')
      .where('user_username', '=', username)
      .returning(aliases)
      .executeTakeFirst();
  }
}
