import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { KanbanBoardComponent } from './modules/taskboard/kanban-board/kanban-board.component';
import { NotificationListComponent } from './modules/notifications/notification-list/notification-list.component';
import { ChatWindowComponent } from './modules/real-time-chat/chat-window/chat-window.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ProjectListComponent } from './modules/project/project-list/project-list.component';
import { authGuard } from './modules/auth/auth.guard';
import { RoleGuard } from './modules/auth/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard, RoleGuard], // Protected route
    },
    {
      path: 'projects',
      component: ProjectListComponent,
      canActivate: [authGuard], // Protected route
    },
    {
      path: 'taskboard',
      component: KanbanBoardComponent,
      canActivate: [authGuard], // Protected route
    },
    {
      path: 'notifications',
      component: NotificationListComponent,
      canActivate: [authGuard], // Protected route
    },
    {
      path: 'chat',
      component: ChatWindowComponent,
      canActivate: [authGuard], // Protected route
    },
    { path: '**', redirectTo: '/dashboard' }, // Wildcard route for 404 page handling
  ];
