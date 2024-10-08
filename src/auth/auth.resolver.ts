import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('createAuthInput') CreateUserInput: CreateUserInput) {
    return await this.authService.create(CreateUserInput);
  }

  @Mutation(() => Auth)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login(email, password);
  }
}
