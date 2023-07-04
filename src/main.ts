import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5500;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => console.log('SERVER WORKS'));
  } catch (e) {
    console.log(e);
  }
};

start();
