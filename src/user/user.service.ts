import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async findAllUser(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id)

        if (!user) {
            throw new NotFoundException('Usuario nao encontrado')
        }
        return user
    }

    async createUser(data: CreateUserInput): Promise<User> {
        const user = await this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);
        
        if(!userSaved) {
            throw new InternalServerErrorException('Problema para criar um usuario.')
        }

        return userSaved
    }
}
