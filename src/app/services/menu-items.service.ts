import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItems } from '../model/menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  url: string = "http://localhost:3001/api/items";

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMenuItems(): Observable<MenuItems[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<MenuItems[]>(this.url, { headers });
  }

  addMenuItem(menuItem: MenuItems): Observable<MenuItems> {
    const headers = this.getAuthHeaders();
    return this.http.post<MenuItems>(this.url, menuItem, { headers });
  }

  updateMenuItem(id: string, menuItem: MenuItems): Observable<MenuItems> {
    const headers = this.getAuthHeaders();
    const apiUrl = `${this.url}/${id}`;
    return this.http.put<MenuItems>(apiUrl, menuItem, { headers });
  }

  deleteMenuItem(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<void>(apiUrl, { headers });
  }

  getMenuItemById(id: string): Observable<MenuItems> {
    const headers = this.getAuthHeaders();
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<MenuItems>(apiUrl, { headers });
  }
}
