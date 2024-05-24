import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItems } from '../model/menu-items';
import { MenuItemsService } from '../services/menu-items.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  // Properies 
  menuItemList: MenuItems[] = [];
  @ViewChild('imageContainer', {static: false, read: ElementRef}) imageContainer!: ElementRef;
  @ViewChild('menuContainer', {static: false, read: ElementRef}) menuContainer!: ElementRef;
  @ViewChild('aboutContainer', {static: false, read: ElementRef}) aboutContainer!: ElementRef;

  constructor( private menuitemsservice: MenuItemsService, private router: Router) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuitemsservice.getMenuItems().subscribe({
      next: (data) => {
        this.menuItemList = data;
      },
      error: (error) => {
        console.error('Error loading menu items', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  scrollToMenu(): void {
    if (this.menuContainer) {
      this.menuContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


}
