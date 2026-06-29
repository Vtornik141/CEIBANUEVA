export type AutoData = {
  nombreCompraventa: string;
  motor: string;
  marca: string;
  tipo: string;
  kilometraje: string;
  transmision: string;
  pasajeros: string;
  puertas: string;
  exteriorInterior: string;
  precio: string;
};

export type AutoErrors = Partial<Record<keyof AutoData, true>>;

export const EMPTY_AUTO: AutoData = {
  nombreCompraventa: "",
  motor: "",
  marca: "",
  tipo: "",
  kilometraje: "",
  transmision: "",
  pasajeros: "",
  puertas: "",
  exteriorInterior: "",
  precio: "",
};
