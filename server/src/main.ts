import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.use(cookieParser());
	// app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('Chat-PTK')
		.setDescription('The chat-PTK API description')
		.setVersion('1.0')
		.addTag('Authorization')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(18001);
}
bootstrap();
