import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$! :Observable<any[]>
  userCount = 10
  selectedSort = 'age'
  searchText = ''
  searchTrigger: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private userService:UserService) {
    this.searchTrigger.pipe(
    distinctUntilChanged(),
    debounceTime(500)
    ).subscribe(data => {
      this.searchText = data
      if(data != '')
      this.nameSearchChange()
      else
      this.getUsersData()
    });
  }
  
  ngOnInit() {
   this.getUsersData()   
   console.error('includes',"asdfghj".includes('as'));
   
  }

  getUsersData() {    
     this.users$ = this.userService.getUsers(this.userCount,this.selectedSort).pipe(
      map(data => { 
         return data})
     )
  }

  loadMore() {
    this.userCount+=10;
    this.getUsersData()
  }

  sortTypeChange(event:any) {
    this.userCount = 10;
    this.getUsersData()
    
  }

  nameSearchChange() {     
    this.users$ = this.userService.nameSearch(this.userCount,this.searchText).pipe(
      map(data => { 
         return data})
     )
  }
}


