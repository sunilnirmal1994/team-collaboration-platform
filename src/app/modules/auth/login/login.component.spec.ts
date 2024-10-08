import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj(['login']);
    routerMock = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password controls', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    expect(usernameControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  it('should show an error if form is invalid on submit', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;

    submitButton.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call AuthService login method on valid form submission', () => {
    component.loginForm.setValue({ username: 'test', password: 'password' });
    authServiceMock.login.and.returnValue(of({ token: '12345' }));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    expect(authServiceMock.login).toHaveBeenCalledWith('test', 'password');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error message on login failure', () => {
    component.loginForm.setValue({ username: 'test', password: 'wrongpassword' });
    authServiceMock.login.and.returnValue(throwError({ error: 'Unauthorized' }));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Invalid credentials');
    const errorMsg = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMsg.textContent).toContain('Invalid credentials');
  });

  it('should navigate to the dashboard after a successful login', () => {
    component.loginForm.setValue({ username: 'test', password: 'password' });
    authServiceMock.login.and.returnValue(of({ token: '12345' }));

    component.onSubmit();
    fixture.detectChanges();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not call login method if form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;

    submitButton.click();
    fixture.detectChanges();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });
});
