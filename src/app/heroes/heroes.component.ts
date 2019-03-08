import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes', //components css selector or css file
  templateUrl: './heroes.component.html', //location of components template file
  styleUrls: ['./heroes.component.css'] //location of the components private css styles
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero; 

  onSelect(hero: Hero): void{ //binds to the click event in the ./heroes.component.html file
    this.selectedHero = hero
  }

  heroes = HEROES

  constructor() { }


  ngOnInit() {
  }

}
