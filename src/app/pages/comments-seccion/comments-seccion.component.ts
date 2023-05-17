import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-comments-seccion',
  templateUrl: './comments-seccion.component.html',
  styleUrls: ['./comments-seccion.component.css']
})
export class CommentsSeccionComponent {
  @Input() comentarios: any[]=[];

}
