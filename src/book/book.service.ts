import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
  ) {}
  async findAllBooks(): Promise<BookEntity[]> {
    let books = await this.bookRepo.find();
    return books;
  }

  async findBookById(
    id: number,
  ): Promise<BookEntity> {
    let book = await this.bookRepo.findOne({
      where: { id: id },
    });
    return book;
  }

  async deleteBook(id: number): Promise<String> {
    await this.bookRepo.delete(id);
    return 'Book has been deleted';
  }

  async addbook(
    addBookArgs: AddBookArgs,
  ): Promise<string> {
    let book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book has been sucessfully added!';
  }

  async updateBook(
    updateBookArgs: UpdateBookArgs,
  ): Promise<string> {
    let book: BookEntity =
      await this.bookRepo.findOne({
        where: { id: updateBookArgs.id },
      });
    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book has been sucessfully updated!';
  }
}
