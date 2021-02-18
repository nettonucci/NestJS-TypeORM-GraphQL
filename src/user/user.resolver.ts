import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(
        private UserService: UserService
    ) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.UserService.findAllUser()
        return users
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        const user = await this.UserService.findUserById(id)
        return user
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.UserService.createUser(data);
        return user;
    }
}
