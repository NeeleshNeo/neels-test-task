import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl,FormGroup} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  UserForm = new FormGroup({
    name: new FormControl(''),
    statusMessage: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
    isPublic: new FormControl(null),
  });

   id!:number
   createdAt = null
   paramSubs!: Subscription
   userType = "edit"
   avatarUrl =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqAZG7zLGhZIxSUV6EVLfQX3WEUawmvM-eA&usqp=CAU"

  constructor(private routes:ActivatedRoute,
    private router:Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id']
   this.paramSubs = this.routes.params.subscribe((params:Params) => {
      this.id = params['id']
      if(!this.id) {
        this.userType = "add"
      } else {
        this.initForm()
      }
    }) 
  }

  onDestroy() {
    this.paramSubs.unsubscribe()
  }

  initForm() {    
    this.userService.getUserById(this.id).subscribe(data => {
     const {
      name,
      statusMessage,
      email,
      age,
      isPublic,
      createdAt,
      } = data
      this.createdAt = createdAt
      
      this.UserForm.get('name')?.setValue(name);
      this.UserForm.get('statusMessage')?.setValue(statusMessage);
      this.UserForm.get('email')?.setValue(email);
      this.UserForm.get('age')?.setValue(age);
      this.UserForm.get('isPublic')?.setValue(!!isPublic);
    })
  
  }

  onSubmit() {
    let payload = this.UserForm.value;
    if(this.userType === 'add') {
      payload = {...payload,
        createdAt: new Date(),
        avatarUrl: this.avatarUrl}

        this.userService.addNewUser(payload).subscribe((data:any) => {
          console.error('data',data);          
        });
    } else {
      console.error('edit');
      
      this.userService.editUser(payload,this.id).subscribe((res:any) => {
        console.log(res)
      })
    }
   
    console.error('payload',payload);
    
  }
}

// {
//   "age": 83,
//   "avatarUrl": "https://www.dreamstime.com/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-image189495158",
//   "bio": "no bio added",
//   "color": "#8D6F96",
//   "createdAt": "2021-07-21T03:31:00Z",
//   "email": "#fccgiea@qzjkl.fz",
//   "isPublic": true,
//   "name": "test name",
//   "statusMessage": "watching Netflix"
// }