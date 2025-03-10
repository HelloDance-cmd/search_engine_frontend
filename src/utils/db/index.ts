// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface User {
  id: number;
  username: string,
  accessed_title: string,
  created_at: Date,
  accessed_url: string
}

const db = new Dexie('user_cache') as Dexie & {
  user_cache: EntityTable<
    User,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  user_cache: '++id, username, accessed_title, created_at, accessed_url' // primary key "id" (for the runtime!)
});

export type { User  };
export { db };