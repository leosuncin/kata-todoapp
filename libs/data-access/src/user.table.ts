import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

import { TransformObjectPropertiesRemovePrefixAndCamelizeThem } from '@data-access/types.js';

export interface UserTable {
  user_id: `user_${string}`;
  user_username: string;
  user_password: string;
  user_bio: string | null;
  user_created_at: ColumnType<Date, never, never>;
  user_updated_at: ColumnType<Date, never, string | undefined>;
}

export type User = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Selectable<UserTable>
>;

export type UserWithoutPassword = Omit<User, 'password'>;

export type CreateUser = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Omit<Insertable<UserTable>, 'user_id'>
>;

export type UpdateUser = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Omit<Updateable<UserTable>, 'user_id' | 'user_updated_at'>
>;
