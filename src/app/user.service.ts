import { Injectable } from '@angular/core';
import { filter, map, Observable, of, toArray } from 'rxjs';
import { HttpClient } from  '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  
  url = 'http://localhost:3333/users';

  constructor(private http: HttpClient) { }

  getUsers(count:number,type:string):Observable<any>{

    return this.http.get(this.url).pipe(
      filter((data:any) => {
        
        return this.sortData(type,data).splice(count)
      })
    )
    
  }

  getUserById(id : number): Observable<any>{
   return this.http.get(`${this.url}/${id}`)
  }

  addNewUser(payload: any):Observable<any> {
    return this.http.post(this.url,payload)
  }

  editUser(payload:any,id:number):Observable<any> {
    return this.http.put(`${this.url}/${id}`,payload)
  }

  sortData(type:string,data:any) {
    data.sort((a:any, b:any) => {
      return a?.[type] < b?.[type] ? -1 : 1;
   });
   return data
  }

  nameSearch(count:number,name:string):Observable<any>{
    return this.http.get(this.url).pipe(
      map((data:any) => data.filter((item:any) => item.name.includes(name))))
  }
}
