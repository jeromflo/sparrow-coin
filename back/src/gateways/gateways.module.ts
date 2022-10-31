import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { ServerServerClientGateway } from './server-server-client/server-server-client.gateway';
import { ClientFrontGateway } from './client-front/client-front.gateway';
import { VerificarDatabaseGateway } from './server-server-client/verificar-database/verificar-database.gateway';
import { SincronizarCadenaGateway } from './server-server-client/sincronizar-cadena/sincronizar-cadena.gateway';
import { GetTransaccionGateway } from './server-server-client/transaccion/transaccion.gateway';
import { NodoBlockchainGateway } from './server-server-client/nodo-blockchain/nodo-blockchain.gateway';

@Module({
  imports: [SharedModule],
  providers: [
    ServerServerClientGateway,
    ClientFrontGateway,
    SincronizarCadenaGateway,
    VerificarDatabaseGateway,
    GetTransaccionGateway,
    NodoBlockchainGateway,
  ],
})
export class GatewaysModule {}
