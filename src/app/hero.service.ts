import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  
  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero=>hero.id===id))
  // }
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
    
    //Log a HeroService message with the MessageService 
    private log(message: string){
      this.messageService.add(`HeroService: ${message}`);
    }
    
    
    private heroesUrl = '/api/heroes'; //URL to web api

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    
    //BEGIN GET/PUT/POST/DELETE
    
    //GET heroes endpoint
    getHeroes(): Observable<Hero[]>{
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_=>this.log('fetched heroes')),
          catchError(this.handleError('getHeroes',[]))
        );
    } //The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page. They'll do that with the RxJS tap operator, which looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves.

    //GET hero by id. Will 404 if not found
    getHero(id: number): Observable<Hero>{
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_=>this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
    }

    //PUT: update the hero on the server
    updateHero(hero: Hero): Observable<any>{
      return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
        tap(_=>this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
    } //The HttpClient.put() method takes three parameters
      // the URL
      // the data to update (the modified hero in this case)
      // options


    //POST: add a new hero to the server
    addHero(hero: Hero): Observable<Hero>{
      return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
        tap((newHero: Hero)=>this.log(`added hero with id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
     } //HeroService.addHero() differs from updateHero in two ways.
        // it calls HttpClient.post() instead of put().
        // it expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller.

    
    //DELETE: delete the hero from the server
    deleteHero(hero: Hero | number): Observable<Hero>{
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`

      return this.http.delete<Hero>(url,httpOptions).pipe(
        tap(_=> this.log(`delete hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
     } 
     //it calls HttpClient.delete.
    //     the URL is the heroes resource URL plus the id of the hero to delete
    //     you don't send data as you did with put and post.
    //     you still send the httpOptions.

    //END GET/PUT/POST/DELETE
  }
  
  // Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator. This marks the class as one that participates in the dependency injection system. 
  
  //The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
  
  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.