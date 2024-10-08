import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/api/projects'; // Backend API URL for projects

  constructor(private http: HttpClient) {}

  /**
   * Fetch all projects
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  /**
   * Fetch a project by ID
   * @param id Project ID
   */
  getProjectById(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => console.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /**
   * Add a new project
   * @param project Project data to be created
   */
  createProject(project: Project): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Project>(this.apiUrl, project, httpOptions).pipe(
      tap((newProject: Project) => console.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('createProject'))
    );
  }

  /**
   * Update an existing project
   * @param project Project data to be updated
   */
  updateProject(project: Project): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.apiUrl}/${project.id}`, project, httpOptions).pipe(
      tap(_ => console.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /**
   * Delete a project
   * @param id Project ID to be deleted
   */
  deleteProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Project>(url).pipe(
      tap(_ => console.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /**
   * Handle HTTP operation failures
   * @param operation Name of the operation that failed
   * @param result Value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}