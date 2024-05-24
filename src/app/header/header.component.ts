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

  constructor() {}

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    this.openBtn = document.getElementById("open-menu");
    this.closeBtn = document.getElementById("close-menu");

    if (this.openBtn && this.closeBtn) {
      this.openBtn.addEventListener("click", this.toggleMenu);
      this.closeBtn.addEventListener("click", this.toggleMenu);
    }

    // Hämta header-elementet
    const header: HTMLElement | null = document.getElementById("myHeader");

    if (header) {
      // Hämta den nuvarande positionen på sidan när du laddar sidan
      let prevScrollPos: number = window.pageYOffset;

      // Lägg till en händelselyssnare för när du scrollar
      window.onscroll = function() {
        const currentScrollPos: number = window.pageYOffset;

        // Om du scrollar uppåt eller är högst upp på sidan, gör headern genomskinlig
        if (prevScrollPos > currentScrollPos || currentScrollPos === 0) {
          header.classList.remove("transparent");
        } else {
          // Annars, när du scrollar neråt, gör headern fast och genomskinlig
          header.classList.add("transparent");
        }

        // Uppdatera den tidigare scrollpositionen för nästa scrollhändelse
        prevScrollPos = currentScrollPos;
      }
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
