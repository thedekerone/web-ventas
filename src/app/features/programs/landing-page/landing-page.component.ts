import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Plan } from "src/app/models/home/program";
import { programsService } from "src/app/services/programs.service";
import { SharedService } from "src/app/services/shared.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  public plan: Plan | undefined;
  public planes: Plan[];
  public banners: {
    id: number;
    image: string;
    link: string;
    icon: string;
    text: string;
  }[] = [];

  constructor(
    private programsService: programsService,
    private storage: StorageService,
    private crypto: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.planes = this.storage.getCookie("planes")
      ? JSON.parse(
          this.crypto.decrypt(
            this.storage.getCookie("planes"),
            this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
          )
        )
      : [];
    console.log(this.planes);
  }

  getPlan() {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (!params["id"] || !this.planes[params["id"]]) {
        this.router.navigate(["/"]);
        return;
      }
      this.plan = this.planes[params["id"]];
      console.log(this.plan);
    });
  }

  ngOnInit(): void {
    console.log("dsaddsa");
    if (this.planes.length == 0) {
      this.getPlanes();
      return;
    }
    this.getPlan();
  }

  getPlanes() {
    this.programsService.getPrograms().subscribe((res) => {
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
      this.storage.setCookie(
        "planes",
        this.crypto.encrypt(
          JSON.stringify(this.planes),
          this.storage.getCookie("1604e4ec4971ff5ace5fa1a099797ffa1")
        ),
        1
      );
      this.getPlan();
    });
  }
}
