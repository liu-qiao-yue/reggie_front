export interface FlavorConfiguration {
    id: string;
    name: string;
    parentId: string;
    children: FlavorConfiguration[]; 
  }