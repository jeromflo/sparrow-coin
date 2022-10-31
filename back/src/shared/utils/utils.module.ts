import { Module } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';

@Module({ imports: [CryptoService], exports: [CryptoService] })
export class UtilsModule {}
