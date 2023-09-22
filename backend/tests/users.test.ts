import prisma from "../db";
import { cleanUpDefaultUser, createDefaultUser } from "./helpers";
import { User } from "@prisma/client";
import { makeTest } from "./helpers";
import { defaultUser, generateUser } from "./fixtures/users";
import { StatusCodes } from "http-status-codes";
import jwtService from "../server/services/jwt-service";

describe("Users", function () {
  describe("Register", () => {
    afterEach(async () => await prisma.user.deleteMany());

    it("should register user successfully", (done) => {
      makeTest((request) => {
        const userFixture = generateUser();
        request
          .post("/users/register")
          .send(userFixture)
          .accept("application/json")
          .expect(StatusCodes.CREATED, (err, res) => {
            if (err) return done(err);

            const body = res.body;
            expect(body.accessToken).toBeDefined();
            expect(body.user).toBeDefined();
            done();
          });
      });
    });
  });

  describe("Login", () => {
    let user: User;

    beforeAll(async () => (user = await createDefaultUser(prisma)));
    afterAll(async () => await cleanUpDefaultUser(prisma));

    it("should login successfully", (done) => {
      makeTest((request) => {
        request
          .post("/users/login")
          .send({
            username: defaultUser.username,
            password: defaultUser.password,
          })
          .accept("application/json")
          .expect(StatusCodes.OK)
          .end((err, res) => {
            if (err) return done(err);

            const body = res.body;
            expect(body.status).toEqual("success");
            expect(body.accessToken).toBeDefined();
            expect(body.user).toBeDefined();
            expect(body.user.id).toEqual(user.id);
            done();
          });
      });
    });

    it("should get current user", (done) => {
      makeTest(async (request) => {
        const token = jwtService.signToken(user.id);

        request
          .get("/users/me")
          .auth(token, { type: "bearer" })
          .accept("application/json")
          .expect(StatusCodes.OK, (err, res) => {
            if (err) return done(err);

            const body = res.body;

            expect(body.data.id).toEqual(user.id);
            expect(body.data.username).toEqual(user.username);
            expect(body.data.firstName).toEqual(user.firstName);
            expect(body.data.lastName).toEqual(user.lastName);

            done();
          });
      });
    });
  });
});
