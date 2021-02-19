import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Resolver('Message')
export class MessageResolver {
    constructor(
        private MessageService: MessageService
    ) {}

    @Query(() => [Message])
    async messages(): Promise<Message[]> {
        const messages = await this.MessageService.findAllMessage()
        return messages
    }

    @Query(() => Message)
    async message(
        @Args('id') id: string
    ): Promise<Message> {
        const message = await this.MessageService.findMessageById(id)
        return message
    }

    @Mutation(() => Message)
    async createMessage(
        @Args('data') data: CreateMessageInput
    ): Promise<Message> {
        const message = await this.MessageService.createMessage(data)
        return message
    }
}
