import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('url')
export class UrlShortenerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    alias: string;

    @Column({ nullable: false })
    long_url: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_dt: boolean;

    @Column({ nullable: false })
    token: string;
}
