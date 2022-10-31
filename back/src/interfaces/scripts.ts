export interface IScripts {
  setInstanceTimestamp(value);
  setInstanceOwner(value);
  setInstanceScript(script: string);
  isValid(): boolean;
  getTimestamp();
  getInstanceOwner();
  getScript();
}
