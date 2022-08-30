import { Scripts } from './scripts';

export class Node {
  private readonly $idNode: number;
  private $owner: number;
  private $lastSignature: any;
  private $scripts: Scripts[];
  private $miner: number[];
}
