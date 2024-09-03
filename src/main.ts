import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { GraphQLSchemaHost } from '@nestjs/graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //   }),
  // );
  await app.listen(3000, () => {
    const { schema } = app.get(GraphQLSchemaHost);
  });
}
bootstrap();
