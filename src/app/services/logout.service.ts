import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
    // Ta bort token från localStorage eller var den än är sparad
    localStorage.removeItem('Token');

    // Omdirigera användaren till /home-sidan
    this.router.navigateByUrl('/home');
  }
}
