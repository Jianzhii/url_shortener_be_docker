import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UlrShortenerModule } from './url_shortener/url_shortener.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                ENV: Joi.string().required(),
                PORT: Joi.number().required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_PORT: Joi.number().required().default(3306),
                DATABASE: Joi.string(),
                DOMAIN_NAME: Joi.string().default(`http://localhost:8080/`),
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            entities: [path.join(__dirname, '/**/*.entity.js')],
            synchronize: false,
        }),
        UlrShortenerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
