import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import {
  SerializePlugin,
  defaultDeserializer,
  defaultSerializer,
} from 'kysely-plugin-serialize';

import { TaskTable } from '@data-access/task.table.js';
import { UserTable } from '@data-access/user.table.js';

export interface Database {
  users: UserTable;
  tasks: TaskTable;
}

export type Connection = Kysely<Database>;

export function createDatabase(
  filename: string | Buffer,
  options?: SQLite.Options,
): Kysely<Database> {
  return new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(filename, options),
    }),
    plugins: [
      new SerializePlugin({
        serializer(value) {
          if (typeof value === 'boolean') {
            return value ? 1 : 0;
          }
          return defaultSerializer(value);
        },
        deserializer(value) {
          if (typeof value === 'number') {
            if (value === 0) {
              return false;
            }
            if (value === 1) {
              return true;
            }
            return value;
          }
          return defaultDeserializer(value);
        },
      }),
    ],
  });
}
