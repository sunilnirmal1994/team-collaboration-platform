export interface Task {
    id: number;              
    title: string;           
    description: string;     
    status: TaskStatus;      
    assignedTo?: string;    
    dueDate?: Date;          
    priority?: TaskPriority; 
    createdAt: Date;        
    updatedAt?: Date;        
  }
  
  /**
   * Enum for task status
   */
  export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
   // Blocked = 'Blocked'
  }
  
  /**
   * Enum for task priority
   */
  export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
  }
  