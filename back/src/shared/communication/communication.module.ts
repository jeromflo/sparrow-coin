import { InterconnectionService } from './interconnection/interconnection.service';
import { Module } from '@nestjs/common';
import { ClientService } from './client/client.service';

@Module({
  providers: [InterconnectionService, ClientService],
  exports: [InterconnectionService],
})
export class CommunicationModule {}
