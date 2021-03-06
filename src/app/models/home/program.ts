export interface ProgramSpecifications {
  icon: string;
  text: string;
}
export interface Plan {
  id: number;
  title: string;
  logo: string;
  link: string;
  banner?: string;
  color?: string;
  specifications: ProgramSpecifications[];
}
