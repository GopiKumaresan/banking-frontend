import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location],
  standalone : true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    UserProfileComponent,
    TransactionHistoryComponent,
    TransferMoneyComponent,
    LoginComponent,
    RouterOutlet,
    NgbModule
      ]
})
export class AppComponent implements OnInit {
  title = 'banking-frontend';
  private _routerSub: Subscription | undefined;

  @ViewChild(NavbarComponent)
  navbar: NavbarComponent | undefined;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location
  ) { }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._routerSub = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else if (window.document.activeElement) {
        window.document.activeElement.scrollTop = 0;
      }
      if (this.navbar) {
        this.navbar.sidebarClose();
      }
    });

    this.renderer.listen('window', 'scroll', (event) => {
      // Handle window scroll event
    });

    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    let version: number | undefined;
    if (trident > 0) {
      const rv = ua.indexOf('rv:');
      version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    if (version) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('ie-background');
    }
  }

  removeFooter() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    return !(titlee === '/signup' || titlee === '/nucleoicons' || titlee === '/login' || titlee === '/register');
  }

  ngOnDestroy() {
    if (this._routerSub) {
      this._routerSub.unsubscribe();
    }
  }
}
