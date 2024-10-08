import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  name: string;
  description: string;
  status: 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})

export class ProjectListComponent implements OnInit {
 // projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
   //   this.projects = projects;
    });
  }

  projects: Project[] = [
    {
      name: 'Task 1',
      description: 'This is about Task 1',
      status: 'Completed'
    },
    {
      name: 'Task 2',
      description: 'This is about Task 2',
      status: 'In Progress'
    },
    {
      name: 'Task 3',
      description: 'This is about Task 3',
      status: 'In Progress'
    }
  ];

  // Function to mark a project as completed
  completeProject(index: number) {
    this.projects[index].status = 'Completed';
  }

}