import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';
import { AddtrainerComponent } from '../components/addtrainer/addtrainer.component';
import { GymownerComponent } from '../components/gymowner/gymowner.component';
import { TrainerComponent } from '../components/trainer/trainer.component';
import { WorkingHoursComponent } from '../components/roles/gymowner/working-hours/working-hours.component';
import { GymprofileComponent } from '../components/roles/gymowner/gymprofile/gymprofile.component';
import { EditTimingsComponent } from '../components/edit-timings/edit-timings.component';
import { ServiceListComponent } from '../components/service/service-list/service-list.component';
import { AddServiceComponent } from '../components/service/add-service/add-service.component';
import { GymServicesComponent } from '../components/roles/gymowner/gym-services/gym-services.component';
import { GymViewComponent } from '../components/roles/gymowner/gym-view/gym-view.component';
import { TrainerViewComponent } from '../components/roles/gymowner/trainer-view/trainer-view.component';
import { GymAddComponent } from '../components/roles/gymowner/gym-add/gym-add.component';
import { TrainerProfileComponent } from '../components/roles/gymowner/trainer-profile/trainer-profile.component';
import { GymGalleryComponent } from '../components/roles/gymowner/gym-gallery/gym-gallery.component';
import { GymsListComponent } from '../components/roles/user/gyms-list/gyms-list.component';


const routes: Routes = [
	{
		path: 'streams',
		component: StreamsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'post/:id',
		component: CommentsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'people',
		component: PeopleComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'workinghours',
		component: WorkingHoursComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymprofile',
		component: GymprofileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trainerprofile',
		component: TrainerProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymadd',
		component:GymAddComponent,
		canActivate: [AuthGuard]
	},	
	{
		path: 'gymview/:id',
		component: GymViewComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trainerview/:id',
		component: TrainerViewComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymowner',
		component: GymownerComponent,
		canActivate: [AuthGuard]
	},
	
	{
		path: 'trainer',
		component: TrainerComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'people/following',
		component: FollowingComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'people/followers',
		component: FollowersComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'addpeople',
		component: AddpeopleComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'addtrainer',
		component: AddtrainerComponent,
		canActivate: [AuthGuard]
	},
	// {
	// 	path: 'edittimings',
	// 	component: EditTimingsComponent,
	// 	canActivate: [AuthGuard]
	// },
	{
		path: 'edittimings/:name/:value',
		component: EditTimingsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'notifications',
		component: NotificationsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'chat/:name',
		component: ChatComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymgallery/:name',
		component: GymGalleryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymservices',
		component: GymServicesComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'images/:name',
		component: ImagesComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'servicelist',
		component: ServiceListComponent,
		canActivate: [AuthGuard]

	},
	{
		path: 'addservice',
		component: AddServiceComponent,
		canActivate: [AuthGuard]

	},	
	{
		path: ':name',
		component: ViewUserComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'account/password',
		component: ChangePasswordComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gymslist',
		component: GymsListComponent
	},	
	
	{
		path: '**',
		redirectTo: 'streams'
	}
];
@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)], // takes in routes array
	exports: [RouterModule]
})
export class StreamsRoutingModule { }
