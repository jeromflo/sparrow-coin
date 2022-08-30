import { IScripts } from './../interfaces/scripts';
export class Scripts implements IScripts {
  private $timestamp: number;
  private $owner: number;
  private $script: string;
  private $isValid: boolean;
  setInstanceTimestamp(value: any) {
    if (!this.$timestamp) {
      this.$timestamp = value;
    }
    return this.$timestamp;
  }
  setInstanceOwner(value: any) {
    if (!this.$owner) {
      this.$owner = value;
    }
    return this.$owner;
  }
  setInstanceScript(script: string) {
    if (!this.$script) {
      this.$script = script;
    }
    return this.$script;
  }
  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
  getTimestamp() {
    return this.$timestamp;
  }
  getInstanceOwner() {
    return this.$owner;
  }
  getScript() {
    return this.$script;
  }
}
