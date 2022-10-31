import { MerkleTree } from 'merkletreejs';
import sha256 = require('crypto-js/sha256');

export class MerkleTreeImpl {
  private leaves: any[];
  private tree: MerkleTree;
  private root: string;

  public getLeaves(): any[] {
    return this.leaves;
  }

  public setLeaves(leaves: []): void {
    this.leaves = leaves;
  }

  createMerkleTree(leaves?: any[]) {
    if (leaves) {
      this.leaves = leaves;
    }
    this.tree = new MerkleTree(this.leaves, sha256);
    this.root = this.tree.getRoot().toString('hex');
  }

  verificaLeaf(leaf: string): boolean {
    const leaf256 = sha256(leaf);
    const proof = this.tree.getProof(leaf256);
    return this.tree.verify(proof, leaf, this.root);
  }
  toString(): string {
    return this.tree.toString();
  }
}
