import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostComponent } from '../components/post/post.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { EmojiPickerModule } from 'ng2-emoji-picker';
import { ImagesComponent } from '../components/images/images.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';
import { AddtrainerComponent } from '../components/addtrainer/addtrainer.component';
import { GymownerComponent } from '../components/gymowner/gymowner.component';
import { TrainerComponent } from '../components/trainer/trainer.component';
import { WorkingHoursComponent } from '../components/roles/gymowner/working-hours/working-hours.component';
import { GymprofileComponent } from '../components/roles/gymowner/gymprofile/gymprofile.component';
import { GymViewComponent } from '../components/roles/gymowner/gym-view/gym-view.component';
import { TrainerViewComponent } from '../components/roles/gymowner/trainer-view/trainer-view.component';
import { EditTimingsComponent } from '../components/edit-timings/edit-timings.component';
import { GymAddComponent } from '../components/roles/gymowner/gym-add/gym-add.component';

// import { CommentsComponent } from '../componets/comments/comments.component';

@NgModule({
	declarations: [
		StreamsComponent,
		ToolbarComponent,
		SideComponent,
		PostFormComponent,
		PostComponent,
		CommentsComponent,
		PeopleComponent,
		FollowingComponent,
		FollowersComponent,
		NotificationsComponent,
		TopStreamsComponent,
		ChatComponent,
		MessageComponent,
		ImagesComponent,
		ViewUserComponent,
		ChangePasswordComponent,
		AddpeopleComponent,
		AddtrainerComponent,
		GymownerComponent,
		TrainerComponent,
		WorkingHoursComponent,
		GymprofileComponent,
		GymViewComponent,
		TrainerViewComponent,
		EditTimingsComponent,
		GymAddComponent
		

	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgxAutoScrollModule,
		FileUploadModule,
		EmojiPickerModule.forRoot(),

	],
	exports: [StreamsComponent, ToolbarComponent],
	providers: [TokenService, PostService, UsersService, MessageService]
})
export class StreamsModule { }
