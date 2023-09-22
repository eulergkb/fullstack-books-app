import { faker } from "@faker-js/faker";

export function generateBook() {
  return {
    title: faker.commerce.productName(),
    isbn: faker.string.alpha({ length: 5 }),
    author: faker.person.fullName(),
  };
}

export function generateBooks(size: number) {
  const books: any[] = [];
  for (let i = 0; i < size; i++) books.push(generateBook());
  return books;
}
