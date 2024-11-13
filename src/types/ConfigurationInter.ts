export interface Configuration {
  id: string;
  name: string;
  parentId?: string;
  children?: Configuration[];
  type: string;
}
