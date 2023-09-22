import prisma from "../db";
import passwordService from "../server/services/password-service";

async function main() {
  await prisma.$connect();
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "default@email.com",
      firstName: "Admin",
      lastName: "Default",
      passwordHash: passwordService.hashPassword("123qwe"),
    },
  });
}

main()
  .catch((error) => {
    console.error("[ERROR]: Failed running seed", error);
  })
  .finally(() => prisma.$disconnect());
