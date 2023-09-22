import { Router } from "express";
import requestHandler from "../../shared/request-handler";
import {
  ApiResponse,
  NotFoundResponse,
  PaginatedResult,
} from "../../shared/responses";
import prisma from "../../../db";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { CreateBookDto } from "./dto/create-book-dto";
import { BookDto } from "./dto/book-dto";
import { createTransformedResult } from "../../shared/request-utils";
import { plainToInstance } from "class-transformer";
import { GetBooksQuery } from "./get-books-query";
import { IdParam } from "../../shared/request-params";

const router = Router();

router.get(
  "/",
  requestHandler(async (req) => {
    const user = req.user!;
    const { page, size, filter } =
      await req.getQuery<GetBooksQuery>(GetBooksQuery);

    const where = {
      userId: user.id,
      OR: filter
        ? [
            { isbn: { contains: filter } },
            { title: { contains: filter } },
            { author: { contains: filter } },
          ]
        : undefined,
    };

    const totalCount = await prisma.book.count({
      where,
    });
    const books = await prisma.book.findMany({
      skip: Number(page - 1) * Number(size),
      take: Number(size),
      where,
    });

    const result: PaginatedResult<BookDto> = {
      totalCount,
      items: plainToInstance(BookDto, books, { excludeExtraneousValues: true }),
    };

    return new ApiResponse(result);
  }),
);

router.get(
  "/:id",
  requestHandler(async (req) => {
    const { id } = await req.getParams<IdParam>(IdParam);

    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!book) {
      return new NotFoundResponse("Book not found");
    }

    return new ApiResponse(createTransformedResult(book, BookDto));
  }),
);

router.post(
  "/",
  requestHandler(async (req) => {
    const payload = await req.getBody<CreateBookDto>(CreateBookDto);
    const user = req.user as User;
    const instance = await prisma.book.create({
      data: {
        title: payload.title,
        userId: user.id,
        isbn: payload.isbn,
        author: payload.author,
      },
    });

    return new ApiResponse(
      createTransformedResult(instance, BookDto),
      StatusCodes.CREATED,
    );
  }),
);

router.put(
  "/:id",
  requestHandler(async (req) => {
    const { id } = await req.getParams<IdParam>(IdParam);
    const payload = await req.getBody<CreateBookDto>(CreateBookDto);
    const result = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        title: payload.title,
        isbn: payload.isbn,
        author: payload.author,
      },
    });
    return result
      ? new ApiResponse(createTransformedResult(result, BookDto))
      : new NotFoundResponse("Book not found");
  }),
);

router.delete(
  "/:id",
  requestHandler(async (req) => {
    const { id } = await req.getParams<IdParam>(IdParam);
    await prisma.book.delete({
      where: {
        id: id,
      },
    });
  }),
);

export default router;
