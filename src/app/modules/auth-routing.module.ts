import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { GymsListComponent } from '../components/roles/user/gyms-list/gyms-list.component';

const routes: Routes = [
	{
		path: 'gymslist',
		component: GymsListComponent
	},
	{
		path: 'login',
		component: AuthTabsComponent
	},
	{
		path: '',
		component: AuthTabsComponent
	},
];
@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)], // takes in routes array
	exports: [RouterModule]
})
export class AuthRoutingModule { }
