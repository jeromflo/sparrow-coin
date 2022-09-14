import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { ServerServerClientGateway } from './server-server-client/server-server-client.gateway';
import { ClientFrontGateway } from './client-front/client-front.gateway';
import { VerificarDatabaseGateway } from './server-server-client/verificar-database/verificar-database.gateway';
import { SincronizarCadenaGateway } from './server-server-client/sincronizar-cadena/sincronizar-cadena.gateway';
import { RealizarTransaccionGateway } from './server-server-client/realizar-transaccion/realizar-transaccion.gateway';

@Module({
  imports: [SharedModule],
  providers: [
    ServerServerClientGateway,
    ClientFrontGateway,
    SincronizarCadenaGateway,
    RealizarTransaccionGateway,
    VerificarDatabaseGateway,
  ],
})
export class GatewaysModule {}
