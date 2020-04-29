import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public title: string;
  public widthSlier: number;
  public AnchuraToSlider: number;
  public autor: any;


  //@ViewChild('textos') textos: any;

  constructor(
  ) {
    this.title = 'Contacto';
  }

  ngOnInit() {
    var opcion_clasica = document.querySelector('.texto').innerHTML;
    //console.log(this.textos.nativeElement.textContent);
  }

  cargarSlider(){
    this.AnchuraToSlider = this.widthSlier;
  }

  getAutor(event){
    console.log(event);
    this.autor = event;
  }

}
