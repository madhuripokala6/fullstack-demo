import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000',/\.github\.dev$/], // Allow requests from the React frontend
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH',
    credentials: true, // Allow cookies or auth headers
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
