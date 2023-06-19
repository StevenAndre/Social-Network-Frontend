import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private numPagService:NumerPAgeServiceService
    ){
    
  }
  
  
  ngOnInit(): void {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Aquí puedes llamar a los métodos de reinicio del componente
        this.resetComponent();
      }
    });


  }
  pageNUMERO=0;
  ocultarMenu = false;
  miniMemu?:string="<<";




  toggleMenu() {
    this.ocultarMenu = !this.ocultarMenu;
    this.miniMemu=!this.ocultarMenu?"<<":">>";
  }

  @ViewChild(InfiniteScrollDirective) infiniteScrollDirective: any;

  

 
  
 
  onScroll() {
    this.pageNUMERO=this.numPagService.getPageNumero();
    this.numPagService.setPageNumero(this.pageNUMERO+1);
    
    let page=this.numPagService.getPageNumero();
    
    this.numPagService.numerPagDisparer.emit(
      {
        data:this.pageNUMERO+1
      }
      );
    
    console.log("ESCROLL FINAL")
    console.log("PAGE: ",this.pageNUMERO)
  }
  private resetComponent(): void {
    this.infiniteScrollDirective.disposeScroller.unsubscribe();
    this.infiniteScrollDirective.setup();
    this.pageNUMERO=0;
  }

}
