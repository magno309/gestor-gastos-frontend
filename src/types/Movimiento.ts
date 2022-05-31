export enum Tipo{
    INGRESO = "INGRESO",
    EGRESO = "EGRESO"
}

export default interface Movimiento{
    id: null;
    fecha: Date;
    descripcion: string;
    cantidad: number;
    tipo: Tipo
}