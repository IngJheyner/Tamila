/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/dto';
import { Contact } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailer: MailerService,
  ) {}

  async create(contactDto: ContactDto): Promise<Contact> {
    try {
      const contact = this.contactRepository.create(contactDto);
      await this.mailer.sendMail({
        to: contact.email,
        from: 'Prueba nestjs <prueba@nestjs.com>',
        subject: 'Nuevo contacto',
        text: `Nombre: ${contact.name}\nEmail: ${contact.email}\nTeléfono: ${contact.phone}\nMensaje: ${contact.message}`,
      });
      return this.contactRepository.save(contact);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
