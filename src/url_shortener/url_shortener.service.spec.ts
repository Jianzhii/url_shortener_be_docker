import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UlrShortenerEntity } from './entities/url_shortener.entity';
import { UlrShortenerService } from './url_shortener.service';

describe('UlrShortenerService', () => {
    let service: UlrShortenerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    validationSchema: Joi.object({
                        NODE_ENV: Joi.string().required(),
                        NODE_PORT: Joi.number().required(),
                        DATABASE_HOST_TEST: Joi.string().required(),
                        DATABASE_USER_TEST: Joi.string().required(),
                        DATABASE_PASSWORD_TEST: Joi.string().required(),
                        DATABASE_PORT_TEST: Joi.number()
                            .required()
                            .default(3306),
                        DATABASE_TEST: Joi.string(),
                        DOMAIN_NAME: Joi.string().default(
                            `http://localhost:8080/`,
                        ),
                    }),
                }),
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DATABASE_HOST_TEST,
                    port: Number(process.env.DATABASE_PORT_TEST),
                    username: process.env.DATABASE_USER_TEST,
                    password: process.env.DATABASE_PASSWORD_TEST,
                    database: process.env.DATABASE_TEST,
                    entities: [path.join(__dirname, '/**/*.entity.{ts, js}')],
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([UlrShortenerEntity]),
            ],
            providers: [UlrShortenerService],
        }).compile();

        service = module.get<UlrShortenerService>(UlrShortenerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
