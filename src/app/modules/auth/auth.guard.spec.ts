import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: authGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Create a mock AuthService with spy
    authServiceMock = jasmine.createSpyObj(['isAuthenticated']);
    routerMock = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], // Import RouterTestingModule to mock routing
      providers: [
        authGuard,
        { provide: AuthService, useValue: authServiceMock }, // Provide mock AuthService
        { provide: Router, useValue: routerMock }            // Provide mock Router
      ]
    });

    guard = TestBed.inject(authGuard); // Inject AuthGuard instance
  });

  // Test: should create the guard
  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  // Test: should allow access when the user is authenticated
  it('should allow access if the user is authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(true); // Mock user is authenticated

    const result = guard.canActivate();

    expect(result).toBeTrue(); // Guard should return true
    expect(routerMock.navigate).not.toHaveBeenCalled(); // Router navigation should not occur
  });

  // Test: should deny access and redirect to login when the user is not authenticated
  it('should deny access if the user is not authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(false); // Mock user is not authenticated

    const result = guard.canActivate();

    expect(result).toBeFalse(); // Guard should return false
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']); // Router should navigate to login
  });
});
