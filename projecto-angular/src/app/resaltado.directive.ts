import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnInit{
  public nativeElement;
  constructor(public el: ElementRef) {


  }

  ngOnInit(){
    var elemnt = this.el.nativeElement;
    elemnt.style.textAlign = 'center';
    elemnt.style.fontFamily = 'HK';

    elemnt.innerText = elemnt.innerText.toUpperCase().replace("CONTACTO", "CONTACTO, ");
  }

}
