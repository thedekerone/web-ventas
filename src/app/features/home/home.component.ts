import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ListProgramsResponse } from "src/app/core/types";
import { Banner } from "src/app/models/home/banner";
import { Plan } from "src/app/models/home/program";
import { programsService } from "src/app/services/programs.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public bannerOptions: OwlOptions;
  public programsOptions: OwlOptions;
  public banners: Banner[];
  public planes: Plan[];

  loading = true;
  constructor(private programsService: programsService) {
    this.bannerOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: false,
      autoplay: true,
      autoplayHoverPause: false,
      dots: false,
      navSpeed: 700,
      navText: ["", ""],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 1,
        },
        940: {
          items: 1,
        },
      },
      nav: true,
    };

    this.programsOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [
        '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 2,
        },
        940: {
          items: 2,
        },
      },
      nav: true,
    };
    this.banners = [];
    this.planes = [];
  }

  noWrapSlides = false;
  showIndicator = true;

  programsList = ["", ""];

  ngOnInit(): void {
    this.programsService
      .getPrograms()
      .subscribe((res: ListProgramsResponse) => {
        console.log("res");
        console.log(res);
        if (res.success) {
          this.banners = res.data.map((el) => {
            return {
              id: el.id_programa,
              image: el.slider,
              link: "/programs",
              icon: el.icon,
              text: el.nombre_programa,
            };
          });
          this.planes = res.data
            .flatMap((el) => el.plan)
            .map((el) => {
              return {
                id: el.id_plan,
                link: "/programs",
                logo:
                  this.banners.find((banner) => banner.id == el.id_programa)
                    ?.icon ?? "",
                title: el.nombre_plan,
                banner: el.slider,
                specifications: el.plan_detalle.map((detalle) => {
                  return {
                    icon: detalle.icon,
                    text: detalle.detalle,
                    id: detalle.id_plan_detalle,
                  };
                }),
              };
            });
        }
        this.loading = false;
      });
  }
}
