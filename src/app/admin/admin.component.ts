import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../model/menu-items';
import { MenuItemsService } from '../services/menu-items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private menuitemservice: MenuItemsService) { }

  ngOnInit() {
    this.menuitemservice.getMenuItems().subscribe(data => {
      this.menuItemList = data;
    })
  }

  addMenuItem() {
    this.menuitemservice.addMenuItem(this.newMenuItem).subscribe(
      response => {
        console.log('Menu item added successfully', response);
        this.menuItemList.push(response); // Uppdatera listan med det nya menyalternativet
        this.newMenuItem = { name: '', description: '', price: 0 }; // Återställ formuläret
      },
      error => {
        console.error('Error adding menu item', error);
      }
    );
  }

  selectMenuItem(menuItem: MenuItems) {
    if (menuItem._id) {
      this.menuitemservice.getMenuItemById(menuItem._id).subscribe(
        response => {
          this.selectedMenuItem = response;
        },
        error => {
          console.error('Error getting menu item by ID', error);
        }
      );
    } else {
      console.error('Error: ID is undefined');
    }
  }

  updateMenuItem() {
    if (this.selectedMenuItem && this.selectedMenuItem._id) {
      this.menuitemservice.updateMenuItem(this.selectedMenuItem._id, this.selectedMenuItem).subscribe(
        response => {
          console.log('Menu item updated successfully', response);
          const index = this.menuItemList.findIndex(item => item._id === response._id);
          if (index !== -1) {
            this.menuItemList[index] = response; // Uppdatera listan med det uppdaterade menyalternativet
          }
          this.selectedMenuItem = null; // Återställ det valda objektet
        },
        error => {
          console.error('Error updating menu item', error);
        }
      );
    }
  }

  deleteMenuItem(id: string | undefined) {
    if (id) {
      this.menuitemservice.deleteMenuItem(id).subscribe(
        () => {
          console.log('Menu item deleted successfully');
          this.menuItemList = this.menuItemList.filter(item => item._id !== id); // Ta bort objektet från listan
        },
        error => {
          console.error('Error deleting menu item', error);
        }
      );
    }
  }

}