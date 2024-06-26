import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { LoginGuardService } from './guard/login-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
    {path: 'transfer', component: TransferMoneyComponent, canActivate: [AuthGuardService]},
    {path: 'history', component: TransactionHistoryComponent, canActivate: [AuthGuardService]},
    // {
    //     path: '',
    //     loadChildren: () => import('./transfer-money.module').then(m => m.Transafer-TransferMoneyComponent)
    //   }
];
 