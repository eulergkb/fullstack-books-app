import { PrismaClient } from "@prisma/client";
import { defaultUser } from "./fixtures/users";
import passwordService from "../server/services/password-service";
import supertest from "supertest";

export const createDefaultUser = async (prisma: PrismaClient) => {
  const { password, ...user } = defaultUser;
  return prisma.user.upsert({
    where: { username: defaultUser.username },
    update: {},
    create: {
      ...user,
      passwordHash: passwordService.hashPassword(password),
    },
  });
};

export const cleanUpDefaultUser = async (prisma: PrismaClient) => {
  await prisma.user.delete({
    where: {
      username: defaultUser.username,
    },
  });
};

export const makeTest = async (
  callback: (test: supertest.SuperTest<supertest.Test>) => any,
) => {
  const { default: app } = await import("../server/app");
  await callback(supertest(app));
};
