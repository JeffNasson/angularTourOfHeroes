import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service'

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

  heroes: Hero[]

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void{
    name=name.trim();
    if(!name){return;}
    this.heroService.addHero({name} as Hero)
      .subscribe(hero=>{
        this.heroes.push(hero)
      })
  }

  delete(hero: Hero): void{
    this.heroes=this.heroes.filter(h=> h != hero);
    this.heroService.deleteHero(hero).subscribe();
  }


  ngOnInit() {
    this.getHeroes();
  }

}
