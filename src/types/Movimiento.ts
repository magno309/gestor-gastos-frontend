export enum Tipo{
    INGRESO,
    EGRESO
}

export default interface Movimiento{
    id: null;
    fecha: number;
    descripcion: string;
    cantidad: number;
    tipo: Tipo
}