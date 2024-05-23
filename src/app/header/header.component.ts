import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  openBtn: HTMLElement | null = null;
closeBtn: HTMLElement | null = null;

  constructor() { }

  ngOnInit(): void {
    this.openBtn = document.getElementById("open-menu");
    this.closeBtn = document.getElementById("close-menu");

    if (this.openBtn && this.closeBtn) {
      this.openBtn.addEventListener("click", this.toggleMenu);
      this.closeBtn.addEventListener("click", this.toggleMenu);
    }
  }

  toggleMenu(): void {
    let navMenuEl: HTMLElement | null = document.getElementById("nav-menu");

    if (navMenuEl) {
      let style: CSSStyleDeclaration = window.getComputedStyle(navMenuEl);

      if (style.display === "none") {
        navMenuEl.style.display = "block";
      } else {
        navMenuEl.style.display = "none";
      }
    }
  }
}
