export interface PlanDetalle {
  id_plan_detalle: number;
  id_plan: number;
  icon: string;
  detalle: string;
  estado: number;
  fecha_registro: string;
}

export interface Plan {
  id_plan: number;
  id_programa: number;
  nombre_plan: string;
  slider: string;
  pdf: string;
  estado: number;
  fecha_registro: string;
  plan_detalle: PlanDetalle[];
}

export interface Programa {
  id_programa: number;
  nombre_programa: string;
  icon: string;
  slider: string;
  text_color: string;
  text_color_2: string;
  estado: number;
  fecha_registro: string;
  plan: Plan[];
}

export interface ListProgramsResponse {
  success: boolean;
  message: string;
  data: Programa[];
}
