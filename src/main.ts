import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { GraphQLSchemaHost } from '@nestjs/graphql';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
  const { schema } = app.get(GraphQLSchemaHost);
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))
  app.enableCors({
    origin: "*"
    , credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

}
bootstrap();
