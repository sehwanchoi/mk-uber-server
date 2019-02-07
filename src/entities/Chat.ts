import { 
    BaseEntity, 
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany, 
} from 'typeorm'
import Message from './Message'


@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    
    @OneToMany(type => Message, message => message.chat)
    messages: Message[]; 

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Chat