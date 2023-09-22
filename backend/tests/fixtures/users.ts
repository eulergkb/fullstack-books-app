import { faker } from "@faker-js/faker";

export const defaultUser = {
  username: "test-user",
  firstName: "Test",
  lastName: "User",
  email: faker.internet.email(),
  phone: faker.phone.number(),
  password: "123",
};

export const generateUser = (props: object = {}) => {
  return {
    username: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.string.numeric({ length: 6 }),
    ...props,
  };
};
