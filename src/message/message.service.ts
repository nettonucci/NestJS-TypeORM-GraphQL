import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateMessageInput} from './dto/create-message.input'
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) {}

    async findAllMessage(): Promise<Message[]> {
        const messages = await this.messageRepository.find()
        return messages
    }

    async findMessageById(id: string): Promise<Message> {
        const message = await this.messageRepository.findOne(id)

        if(!message) {
            throw new NotFoundException('Mensagem nao encontrada')
        }

        return message
    }

    async createMessage(data: CreateMessageInput): Promise<Message> {
        const message = this.messageRepository.create(data);
        const messageSaved =  await this.messageRepository.save(message);

        if (!messageSaved) {
            throw new InternalServerErrorException('Problema para criar uma mensagem')
        }

        return messageSaved
    }
}
