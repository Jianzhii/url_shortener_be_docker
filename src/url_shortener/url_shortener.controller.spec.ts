import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UlrShortenerEntity } from './entities/url_shortener.entity';
import { UlrShortenerController } from './url_shortener.controller';
import { UlrShortenerService } from './url_shortener.service';

describe('UlrShortenerController', () => {
    let controller: UlrShortenerController;
    let service: UlrShortenerService;

    beforeAll(async () => {
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
                    synchronize: false,
                }),
                TypeOrmModule.forFeature([UlrShortenerEntity]),
            ],
            controllers: [UlrShortenerController],
            providers: [UlrShortenerService],
        }).compile();

        controller = module.get<UlrShortenerController>(UlrShortenerController);
        service = module.get<UlrShortenerService>(UlrShortenerService);
    });

    afterAll(async () => {
        await service.clearAll();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it(`POST /shorten`, async () => {
        const alias = `test`;
        const result = await controller.create({
            long_url: 'https://google.com',
            alias: alias,
        });
        expect(result.data.alias).toBe(`${process.env.DOMAIN_NAME}${alias}`);
    });

    it(`GET /shorten/:alias`, async () => {
        const alias = `test`;
        const result = await controller.findOne(alias);
        expect(result.data.long_url).toBe(`https://google.com`);
    });
});
