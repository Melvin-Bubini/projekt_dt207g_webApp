import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../model/menu-items';
import { MenuItemsService } from '../services/menu-items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  menuItemList: MenuItems[] = [];
  newMenuItem: MenuItems = { name: '', description: '', price: 0 };
  selectedMenuItem: MenuItems | null = null;
  showMenu: boolean = false;

  constructor(private menuitemservice: MenuItemsService, private logoutservice: LogoutService, private router: Router) { }

  ngOnInit() {
    this.loadMenuItems();
  }

  logout(): void {
    this.logoutservice.logout();
  }

  loadMenuItems() {
    this.menuitemservice.getMenuItems().subscribe({
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

  addMenuItem() {
    this.menuitemservice.addMenuItem(this.newMenuItem).subscribe({
      next: response => {
        console.log('Menu item added successfully', response);
        this.menuItemList.push(response); // Uppdatera listan med det nya menyalternativet
        this.newMenuItem = { name: '', description: '', price: 0 }; // Återställ formuläret
      },
      error: error => {
        console.error('Error adding menu item', error);
      }
    });
  }
  

  selectMenuItem(menuItem: MenuItems) {
    if (menuItem._id) {
      this.menuitemservice.getMenuItemById(menuItem._id).subscribe({
        next: response => {
          this.selectedMenuItem = response;
        },
        error: error => {
          console.error('Error getting menu item by ID', error);
        }
      });
    } else {
      console.error('Error: ID is undefined');
    }
  }

  toogleMenu() {
    this.showMenu = !this.showMenu;
  }
  

  updateMenuItem() {
    if (this.selectedMenuItem && this.selectedMenuItem._id) {
      this.menuitemservice.updateMenuItem(this.selectedMenuItem._id, this.selectedMenuItem).subscribe({
        next: response => {
          console.log('Menu item updated successfully', response);
          const index = this.menuItemList.findIndex(item => item._id === response._id);
          if (index !== -1) {
            this.menuItemList[index] = response; // Uppdatera listan med det uppdaterade menyalternativet
          }
          this.selectedMenuItem = null; // Återställ det valda objektet
        },
        error: error => {
          console.error('Error updating menu item', error);
        }
      });
    }
  }
  

  deleteMenuItem(id: string | undefined) {
    if (id) {
      this.menuitemservice.deleteMenuItem(id).subscribe({
        next: () => {
          console.log('Menu item deleted successfully');
          this.menuItemList = this.menuItemList.filter(item => item._id !== id); // Ta bort objektet från listan
        },
        error: error => {
          console.error('Error deleting menu item', error);
        }
      });
    }
  }
  

}