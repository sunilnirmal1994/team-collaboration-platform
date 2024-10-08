import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../../models/task.model';
import { AppState } from '../../../store/app-store/app-state';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent implements OnInit {
constructor(private http: HttpClient){}
  // tasks for each column
  // todoTasks = [
  //   'Task 1: Setup the project',
  //   'Task 2: Design UI',
  //   'Task 3: Develop API'
  // ];

  // inProgressTasks = [
  //   'Task 4: Work on frontend',
  //   'Task 5: Unit Testing'
  // ];

  // completedTasks = [
  //   'Task 6: Backend Setup'
  // ];

  todoTasks: string[] = [];
  inProgressTasks: string[] = [];
  completedTasks: string[] = [];
  
  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:3001/tasks').subscribe((tasks) => {
      this.todoTasks = tasks.filter(task => task.status === 'todo').map(task => task.title);
      this.inProgressTasks = tasks.filter(task => task.status === 'in-progress').map(task => task.title);
      this.completedTasks = tasks.filter(task => task.status === 'completed').map(task => task.title);
    });
  }

  // Function to handle the drag-and-drop event across columns
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // If the task is moved within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // If the task is moved to a different column
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}