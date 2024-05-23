import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

}
