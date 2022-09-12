import { Injectable } from '@nestjs/common';
import sha256 from 'crypto-js/sha256';
import HmacMD5 from 'crypto-js/hmac-md5';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
@Injectable()
export class CryptoService {
  public sha256(cadena: string) {
    return sha256(cadena);
  }
  public getBase64(cadena) {
    return Base64(cadena);
  }
  public getMd5(cadena) {
    return HmacMD5(cadena);
  }
}
