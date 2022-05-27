import Movimiento from "@/types/Movimiento";
import http from "../http-commons";

class MovimientoDataService {
    getAll() {
        return http.get("/movimientos");
      }
      get(id: string) {
        return http.get(`/movimientos/${id}`);
      }
      create(data: Movimiento) {
        return http.post("/movimientos", data);
      }
      update(id: string, data: Movimiento) {
        return http.put(`/movimientos/${id}`, data);
      }
      delete(id: string) {
        return http.delete(`/movimientos/${id}`);
      }
      deleteAll() {
        return http.delete(`/movimientos`);
      }
}

export default new MovimientoDataService();