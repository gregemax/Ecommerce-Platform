import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext, PartialType } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class Guard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const crx = GqlExecutionContext.create(context);
    const { req } = crx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
export class rolegurd extends Guard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const crx = GqlExecutionContext.create(context);
    const { req } = crx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role != 'admin') {
      throw new UnauthorizedException('this route is only for admin');
    }
    return user;
  }
}
