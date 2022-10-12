import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'new@user.com' },
    update: {},
    create: {
      email: 'new@user.com',
      password:
        '5ddb963d8bc67b5239765e654827aba7134f874ee86fcac68e70366116f31f0b.4c3396d27eba50cb',
      admin: false,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'neww@user.com' },
    update: {},
    create: {
      email: 'neww@user.com',
      password:
        '63dbe9049c04770b70e476ab6bc760897d0abb08f1b8468b45449076c3204aeb.7f8a7089db96000d',
      admin: false,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
