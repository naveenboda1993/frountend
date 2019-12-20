import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthTabsComponent } from './components/auth-tabs/auth-tabs.component';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { AuthModule } from './modules/auth.module';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
// import { GymownerComponent } from './componenets/gymowner/gymowner.component';
// import { AddpeopleComponent } from './components/addpeople/addpeople.component';

// import { SideComponent } from './component/side/side.component';

@NgModule({
	declarations: [AppComponent,],
	imports: [BrowserModule, AuthModule, AuthRoutingModule, StreamsModule, StreamsRoutingModule,],
	providers: [
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
