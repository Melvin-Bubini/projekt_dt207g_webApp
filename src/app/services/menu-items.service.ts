import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItems } from '../model/menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  url: string = "http://localhost:3001/api/items";

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<MenuItems[]> {
    return this.http.get<MenuItems[]>(this.url);
  }

  getMenuItemById(id: string): Observable<MenuItems> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<MenuItems>(apiUrl);
  }

  addMenuItem(menuItem: MenuItems): Observable<MenuItems> {
    return this.http.post<MenuItems>(this.url, menuItem);
  }

  updateMenuItem(id: string, menuItem: MenuItems): Observable<MenuItems> {
    return this.http.put<MenuItems>(`${this.url}/${id}`, menuItem);
  }

  deleteMenuItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
