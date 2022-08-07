import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('url')
export class UlrShortener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    code: string;

    @Column({ nullable: false })
    url: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_dt: boolean;
}
