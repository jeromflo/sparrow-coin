import { Injectable } from '@nestjs/common';
import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

export class MerkleTreeImpl {
  private leaves: [];
  private tree: MerkleTree;
  private root: string;

  public getLeaves(): [] {
    return this.leaves;
  }

  public setLeaves(leaves: []): void {
    this.leaves = leaves;
  }

  createMerkleTree(leaves?: []) {
    if (leaves) {
      this.leaves = leaves;
    }
    this.tree = new MerkleTree(this.leaves, SHA256);
    this.root = this.tree.getRoot().toString('hex');
  }

  verificaLeaf(leaf: string): boolean {
    const leaf256 = SHA256(leaf);
    const proof = this.tree.getProof(leaf256);
    return this.tree.verify(proof, leaf, this.root);
  }
  toString(): string {
    return this.tree.toString();
  }
}
