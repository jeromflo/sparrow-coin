import { IDireccionesSockets } from './../../interfaces/direccionesSockets';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InterconnectionService {
  private pilaServidores: IDireccionesSockets[];
}
