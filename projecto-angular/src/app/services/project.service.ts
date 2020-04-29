import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()

export class ProjectService{
  public url: string;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.url;
  }

  testService(){
    return "probando servicio de Angular";
  }


  saveProject(project: Project):Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post('save-project', params, {headers: headers});
  }

  getProjects():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get('projects', {headers:headers});
  }

  getProject(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get('project/'+id, {headers: headers});
  }

  deleteProject(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete('project/'+id, {headers:headers});
  }

  updateProject(project):Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put('project/'+project._id, params, {headers: headers});
  }
}
