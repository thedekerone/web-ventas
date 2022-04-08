import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Banner } from 'src/app/models/home/banner';
import { Program } from 'src/app/models/home/program';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  public bannerOptions: OwlOptions;
  public programsOptions: OwlOptions;
  public banners: Banner[];
  public programs: Program[];

  constructor() {
    this.bannerOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: false,
      autoplay : true,
      autoplayHoverPause : false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: true
    };
    this.programsOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 2
        },
        940: {
          items: 2
        }
      },
      nav: true
    }
    this.banners = [
      { id: 1, image: 'assets/images/landing_1.png', link: '/programs', text: 'First' },
      { id: 2, image: 'assets/images/landing_2.png', link: '/programs', text: 'Second' }
    ];
    this.programs = [
      {
        id: 1, title: 'Programa OncoPlus', logo: 'assets/images/logo-auna2.png', link: '/programs', specifications: [
          { icon: "assets/tmp/home/onco/Icono-01.jpeg", text: "<b>Cobertura oncologica al 100%</b> (aplican exclusiones y gastos no cubiertos)." },
          { icon: "assets/tmp/home/onco/Icono-02.jpeg", text: "Beneficio máximo anual sin <b>límite de monto.</b>" },
          { icon: "assets/tmp/home/onco/Icono-03.jpeg", text: "Despistaje oncológico y evaluación general de salud <b>sin costo alguno.</b>" },
          { icon: "assets/tmp/home/onco/Icono-04.jpeg", text: "Acceso a atenciones en clínicas Auna <b>especializadas</b>" }
        ]
      },
      {
        id: 2, title: 'Programa Dr.AUNA', logo: 'assets/images/logo-auna.png', link: '/programs', specifications: [
          { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Teleconsultas</b> sin costo" },
          { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Consultas presenciales</b> Todas las especialidades desde S/.40" },
          { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Farmacia</b> Hasta 10% de descuento" },
          { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Laboratorio e imágenes</b> Hasta 20% de descuento" }
        ]
      },
      {
        id: 3, title: 'Programa OncoPlus Prod', logo: 'assets/images/logo-auna2.png', link: '/programs', specifications: [
          { icon: "assets/tmp/home/onco/Icono-01.jpeg", text: "<b>Cobertura oncologica al 100%</b> (aplican exclusiones y gastos no cubiertos)." },
          { icon: "assets/tmp/home/onco/Icono-02.jpeg", text: "Beneficio máximo anual sin <b>límite de monto.</b>" },
          { icon: "assets/tmp/home/onco/Icono-03.jpeg", text: "Despistaje oncológico y evaluación general de salud <b>sin costo alguno.</b>" },
          { icon: "assets/tmp/home/onco/Icono-04.jpeg", text: "Acceso a atenciones en clínicas Auna <b>especializadas</b>" }
        ]
      }
    ];
  }

  noWrapSlides = false;
  showIndicator = true;

  programsList = ["", ""];

  ngOnInit(): void {
  }

}
