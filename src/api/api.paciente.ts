import { Paciente } from "../model/paciente";
import request from "./api";

const apiPaciente = {
    list: () => request.get<Paciente[]>("User/GetAllByFilter"),
    // add: (data: Paciente) => {
    //     // @ts-ignore
    //     data.student = (data.student=="true");
    //     return authService.newUser(data).then((user)=> {return user})
    // },
    edit: (data: Paciente) => request.put(`User/${data.id}`, data), //Pa dsps
    delete: (id: number) => request.delete(`User/Delete?id=${id}`),
    detail: (id: string) => request.get<Paciente>(`User/GetItemById?id=${id}`),
};

export default apiPaciente;