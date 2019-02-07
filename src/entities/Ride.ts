import { 
    BaseEntity, 
    Column, 
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn, 
} from 'typeorm'
import { rideStatus } from '../types/types';


@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    
    @Column({type: 'text', enum: ["ACCEPTED","FINISHED", "CANCELED", "REQUESTED", "ONROUTE"]})
    status: rideStatus;

    @Column({type: 'text'})
    pickUpAddress: string;

    @Column({type: 'double precision', default: 0 })
    pickupLat: number;

    @Column({type: 'double precision', default: 0 })
    pickupLng: number;
    
    @Column({type: 'text'})
    dropOffAddress: string;

    @Column({type: 'double precision', default: 0 })
    dropOffLat: number;

    @Column({type: 'double precision', default: 0 })
    dropOffLng: number;
    
    @Column({type: 'double precision', default: 0 })
    price: number; 

    @Column({type: 'text'})
    distance: string;

    @Column({type: 'text'})
    duration: string;


    @Column({type: 'boolean', default: false })
    isFavorite: boolean; 

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Ride