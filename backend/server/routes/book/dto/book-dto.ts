import { Expose } from "class-transformer";

export class BookDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  author: string;
  @Expose()
  isbn: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date | null;
}
