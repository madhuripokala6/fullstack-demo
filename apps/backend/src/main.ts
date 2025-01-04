import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow Codespace URLs and localhost
      if (!origin || 
          origin.match(/.*\.app\.github\.dev$/) || 
          origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  });

  // main.ts
  app.use((error, req, res, next) => {
    console.error('Error:', error);
    console.log('Request URL:', req.url);
    console.log('Origin:', req.headers.origin);
    next(error);
  });

  // Important: Listen on all interfaces in Codespaces
  await app.listen(process.env.PORT || 8080, '0.0.0.0');
}
bootstrap();