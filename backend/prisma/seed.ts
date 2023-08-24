import { PrismaClient } from '@prisma/client';
import postData from '../prisma/data/posts.json';
import userData from '../prisma/data/user.json';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function seed() {
  try {
    for (const user of userData) {
      await prisma.user.create({
        data: {
          name: user.name,
          username: user.username,
          password: await bcrypt.hash('123456789', 10),
          email: user.email,
          phone: user.phone,
          website: user.website,
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo_lat: user.address.geo.lat, // Replace with actual latitude value
          geo_lng: user.address.geo.lng, // Replace with actual longitude value
          company_name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
      });
    }
    for (const post of postData) {
      await prisma.post.create({
        data: {
          userId: post.userId,
          title: post.title,
          body: post.body,
        },
      });
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => console.error('Error in seed script:', error));

