import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

const routes: Routes = [
	{
		path: '',
		component: AuthTabsComponent
	}
];
@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)], // takes in routes array
	exports: [RouterModule]
})
export class AuthRoutingModule {}
