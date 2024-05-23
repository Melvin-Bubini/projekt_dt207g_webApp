import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Properties
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log("Login successful", response);
        const token = response?.response?.token;
        if (token) {
          // Spara JWT token. i localStorage 
          localStorage.setItem("Token", token);
          // Navigera till admin
          this.router.navigate(["/admin"]);
        } else {
          this.errorMessage = "Inloggning misslyckades. Felaktig respons.";
        }
      },
      error: (error) => {
        console.error("Login failed", error);
        this.errorMessage = "Felaktigt Användarnamn/Lösenord";
      }
    });
  }

}
