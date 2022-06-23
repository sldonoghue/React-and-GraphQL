
import 'dotenv/config';

import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';

import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  //~ How long a user can stay idle before they are logged out.
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // ~ Adding seed data to the database
    async onConnect(keystone) {
      // ~script in package.json
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    }
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // ~ Show the UI only for people who pass test
    isAccessAllowed: ({session}) => {
      return !!session?.data
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    // ~ GraphQL query
    User: `id`,
  })
}))




