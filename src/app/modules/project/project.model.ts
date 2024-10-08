export interface Project {
    id: number;              
    name: string;           
    description: string;     
    createdAt: Date;        
    updatedAt?: Date;       
    owner?: string;        
    tasks?: number[];       
  }
  