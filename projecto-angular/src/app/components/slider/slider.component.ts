import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    @Input() anchura: number;
    public autor: any;
    @Output() conseguirAutor = new EventEmitter();
  constructor(){
    this.autor = {
      nombre: "Matias Muñoz",
      email: "Matias@Muñoz.com",
      nick: "TheMostWanted"
    };
  }

  ngOnInit() {
    console.log(this.anchura);

    if(this.anchura != undefined){
      $('#slider').css('width', this.anchura);
    }
  }

  lanzar(event){
    console.log(event);
    this.conseguirAutor.emit(this.autor);
  }

}
