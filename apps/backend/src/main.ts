import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the Codespace URL from the environment variable
  const codespaceName = process.env.CODESPACE_NAME;
  console.log('codespaceurl', codespaceName);
  const frontendUrl = codespaceName
    ? `https://${codespaceName}-3000.app.github.dev`
    : 'http://localhost:3000';

  console.log(`Allowed CORS origin: ${frontendUrl}`);

  // Enable CORS with the dynamic frontend URL
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false
  });

  await app.listen(8080);
}
bootstrap();
