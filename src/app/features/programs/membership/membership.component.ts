import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/home/program';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  //Public
  public program: Program;
  public acceptPolicies: Boolean;
  public additionalPurposes: Boolean;
  //Public - Select2 Documents
  public documents: Array<Select2OptionData>;
  public documentSelected: String;
  //Public - Select2 Enterprise
  public enterprises: Array<Select2OptionData>;
  public enterpriseSelected: String;

  constructor() {
    this.acceptPolicies = true;
    this.additionalPurposes = false;
    this.documentSelected = "";
    this.enterpriseSelected = "";
    this.program = {
      id: 2, title: 'Programa Dr.AUNA', logo: 'assets/images/logo-auna.png', link: '/programs', banner: 'assets/images/landing_2.png', specifications: [
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Teleconsultas</b> sin costo" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Consultas presenciales</b> Todas las especialidades desde S/.40" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Farmacia</b> Hasta 10% de descuento" },
        { icon: "assets/tmp/home/auna/icono_01.png", text: "<b>Laboratorio e imágenes</b> Hasta 20% de descuento" }
      ]
    }
    this.documents = [
      { id: '1', text: 'DNI' },
      { id: '2', text: 'CEX' },
      { id: '3', text: 'RUC' },
      { id: '4', text: 'PASAPORTE' },
      { id: '5', text: 'PNI' },
      { id: '6', text: 'OTROS' }
    ];
    this.enterprises = [
      { id: '1', text: 'A N INMOBILIARIA S.A.C' },
      { id: '2', text: 'A Y A EDIFICACIONES S.A.C.' },
      { id: '3', text: 'ABASTECEDORA DEL COMERCIO LIMITADA SUCURSAL PERU' },
      { id: '4', text: 'ACEROS CHILCA S.A.C.' },
      { id: '5', text: 'ACTIVIDADES ELECTROMECANICAS INDUSTRIALES S.R.L. - WS' },
      { id: '6', text: 'ADAMA AGRICULTURE PERU S.A.' },
      { id: '7', text: 'ADIDAS PERU S.A.C' },
      { id: '8', text: 'ADMINISTRACION DE EMPRESAS S.A.C.' },
      { id: '9', text: 'ADMINISTRACION Y GERENCIA EN MINERIA Y CONSTRUCCION SAC' },
      { id: '10', text: 'ADMINISTRADORA CLINICA TRESA S.A' },
      { id: '11', text: 'ADMINISTRADORA DE LA CLINICA SAN JUDAS TADEO S.A.C.' },
      { id: '12', text: 'ADMINISTRADORA DE SERVICIOS FUNERARIOS SAC' },
      { id: '13', text: 'AERO TRANSPORTE S A' },
      { id: '14', text: 'AEROPUERTOS DEL PERU S.A.' },
      { id: '15', text: 'AGENCIA DE COBROS KASNET S.A.C.' },
      { id: '16', text: 'AGENCIA DE PROMOCION DE LA INVERSION PRIVADA' }
    ];
  }

  ngOnInit(): void {
  }

  onSearchInformation() {
    console.log(this.documentSelected);
  }

}
