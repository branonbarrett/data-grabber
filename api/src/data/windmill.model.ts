import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class Windmill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  description: string;

  @Column('geometry')
  location: Point;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}