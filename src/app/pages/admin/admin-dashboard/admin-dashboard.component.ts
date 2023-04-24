import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  ocultarMenu = false;
  miniMemu?:string="<<";

  toggleMenu() {
    this.ocultarMenu = !this.ocultarMenu;
    this.miniMemu=!this.ocultarMenu?"<<":">>";
  }

}
