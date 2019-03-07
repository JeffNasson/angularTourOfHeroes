import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-heroes', //components css selector or css file
  templateUrl: './heroes.component.html', //location of components template file
  styleUrls: ['./heroes.component.css'] //location of the components private css styles
})
export class HeroesComponent implements OnInit {

  hero: Hero ={
    id:1,
    name: 'Windstorm'
  }

  constructor() { }


  ngOnInit() {
  }

}
