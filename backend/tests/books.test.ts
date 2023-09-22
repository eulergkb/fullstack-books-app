import { User } from "@prisma/client";
import { cleanUpDefaultUser, createDefaultUser, makeTest } from "./helpers";
import prisma from "../db";
import { StatusCodes } from "http-status-codes";
import { generateBook } from "./fixtures/books";
import jwtService from "../server/services/jwt-service";

describe("Books", function () {
  let user: User;
  beforeAll(async () => (user = await createDefaultUser(prisma)));
  afterAll(async () => await cleanUpDefaultUser(prisma));

  describe("Create", () => {
    afterAll(async () => await prisma.book.deleteMany());

    it("should create a book successfully", (done) => {
      makeTest(async (request) => {
        request
          .post("/books")
          .auth(jwtService.signToken(user.id), { type: "bearer" })
          .send(generateBook())
          .expect(StatusCodes.CREATED, done);
      });
    });
  });
});
