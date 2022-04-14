import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ListProgramsResponse } from "src/app/core/types";
import { Banner } from "src/app/models/home/banner";
import { Plan } from "src/app/models/home/program";
import { programsService } from "src/app/services/programs.service";
import { SharedService } from "src/app/services/shared.service";
import { StorageService } from "src/app/services/storage.service";

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
  constructor(
    private programsService: programsService,
    private storage: StorageService,
    private crypto: SharedService
  ) {
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
        if (res.success) {
          console.log(res);
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
            .flatMap((el) =>
              el.plan.map((plan) => ({ ...plan, image: el.icon }))
            )
            .map((el) => {
              console.log(el);
              return {
                id: el.id_plan,
                link: "/programs",
                logo: el.image,
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
        this.storage.setCookie(
          "planes",
          this.crypto.encrypt(
            JSON.stringify(this.planes),
            this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
          ),
          1
        );
        this.loading = false;
      });
  }
}
