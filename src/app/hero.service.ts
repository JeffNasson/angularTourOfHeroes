import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]>{
    // sends the message after fetching heroes
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES)
  }
  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero=>hero.id===id))
  }

  constructor(private messageService: MessageService) { }
}

// Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator. This marks the class as one that participates in the dependency injection system. 

//The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
