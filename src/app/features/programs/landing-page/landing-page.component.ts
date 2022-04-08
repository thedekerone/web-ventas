import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/home/program';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public program:Program;

  constructor() {
    this.program = {
      id: 2, title: 'Programa Dr.AUNA', logo: 'assets/images/logo-auna.png', link: '/programs', banner: 'assets/images/landing_2.png', specifications: [
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Teleconsultas</b> sin costo" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Consultas presenciales</b> Todas las especialidades desde S/.40" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Farmacia</b> Hasta 10% de descuento" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Laboratorio e imágenes</b> Hasta 20% de descuento" }
      ]
    }
  }

  ngOnInit(): void {
  }

}
