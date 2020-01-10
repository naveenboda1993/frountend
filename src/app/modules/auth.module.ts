import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';
import { GymsListComponent } from '../components/roles/user/gyms-list/gyms-list.component';


@NgModule({
	declarations: [AuthTabsComponent, LoginComponent, SignupComponent,GymsListComponent],
	imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,],
	exports: [AuthTabsComponent, LoginComponent, SignupComponent,
		GymsListComponent],
	providers: [AuthService]
})
export class AuthModule { }
