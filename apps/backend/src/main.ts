import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting NestJS application...');
  
  const app = await NestFactory.create(AppModule);
  
  // Get Codespace info
  const codespaceName = process.env.CODESPACE_NAME;
  console.log('CODESPACE_NAME:', codespaceName);
  console.log('Current PORT:', process.env.PORT || 8080);
  
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://*.app.github.dev'  // Wildcard for all Codespace URLs
  ];
  
  if (codespaceName) {
    allowedOrigins.push(`https://${codespaceName}-3000.app.github.dev`);
  }
  
  console.log('Allowed origins:', allowedOrigins);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  });

  // Listen on all interfaces
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  
  const serverUrl = await app.getUrl();
  console.log(`Server running at: ${serverUrl}`);
  console.log('CORS configured with origins:', allowedOrigins);
}
bootstrap().catch(error => {
  console.error('Failed to start application:', error);
});