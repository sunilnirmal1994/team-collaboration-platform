import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  chart: any;
  ngOnInit(): void {
    this.chart = new Chart('progressChart', {
      type: 'bar',
      data: {
        labels: ['Task 1', 'Task 2', 'Task 3'],
        datasets: [{
          label: 'Progress',
          data: [20, 50, 80],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      }
    });
  }
}