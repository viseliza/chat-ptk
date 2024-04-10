import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { CreateMessageDto } from '../dto/create.message.dto';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from 'src/services/message.service';
import { Prisma, Room } from '@prisma/client';
import { UpdateMessageDto } from 'src/dto/update.message.dto';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class MessagesGateway {
	@WebSocketServer() server: Server;
	private logger: Logger = new Logger('ChatGateway');

	constructor(private readonly messagesService: MessageService) { }

	@SubscribeMessage('createMessage')
	async create(@MessageBody() createMessageDto: CreateMessageDto) {
		const message = await this.messagesService.create(createMessageDto);
		
		this.server.to(createMessageDto.room.name).emit("message", message);

		return message;
	}

	@SubscribeMessage('takeMessages')
	async findAll(@ConnectedSocket() client: Socket, @MessageBody() { room_id, row }) {
		const response = await this.messagesService.findAll({ room_id, row });
		client.emit("getMessages", response);
	}

	@SubscribeMessage('readMessage')
	async readMessage(@MessageBody('message') message: UpdateMessageDto) {
		return await this.messagesService.updateMessage(message);
	}

	@SubscribeMessage('join')
	joinRoom(
		@MessageBody('name') name: string,
		@ConnectedSocket() client: Socket
	) {
		return this.messagesService.identify(name, client.id);
	}

	@SubscribeMessage('joinRoom')
	handleRoomJoin(client: Socket, room: Room) {
		client.join(room.name);
	}

	@SubscribeMessage('disconect')
	disconect(client: Socket) {
		client.disconnect();
	}

	@SubscribeMessage('typing')
	async typing(
		@MessageBody('isTyping') isTyping: boolean,
		@ConnectedSocket() client: Socket
	) {
		const name = this.messagesService.getClientName(client.id);
		
		client.broadcast.emit('typing', { name, isTyping });
	}

	// @SubscribeMessage('updateMessage')
	// update(@MessageBody() updateMessageDto: UpdateMessageDto) {
	//   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
	// }

	// @SubscribeMessage('removeMessage')
	// remove(@MessageBody() id: number) {
	//   return this.messagesService.remove(id);
	// }
}