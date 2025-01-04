import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests from all origins
      callback(null, true);
    },
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
