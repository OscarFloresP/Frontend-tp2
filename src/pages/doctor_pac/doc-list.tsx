import React, { useState, useRef } from "react";
import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  date: string;
  done: boolean;
}

function DocListPac() {
  const [newTask, setNewTask] = useState<ITask>({ id: 1, name: "", lastName: "", phone: "", date: "", done: false });
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();

    if (
      newTask.name.trim() === "" ||
      newTask.lastName.trim() === "" ||
      !/^(7\d{6}|9\d{8}|[0-9]{7})$/.test(newTask.phone)
    ) {
      setInputError("Por favor, complete todos los campos correctamente.");
      return;
    }

    addTask(newTask);
    setNewTask({ ...newTask, id: newTask.id + 1, name: "", lastName: "", phone: "", date: "", done: false });
    taskInput.current?.focus();
    setInputError("");
  };

  const addTask = (task: ITask): void => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const newTaskWithDate: ITask = { ...task, id: task.id + 1, date: formattedDate };
    const newTasks: ITask[] = [...tasks, newTaskWithDate];
    setTasks(newTasks);
  };

  const toggleDoneTask = (id: number): void => {
    const updatedTasks: ITask[] = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id: number): void => {
    const updatedTasks: ITask[] = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header />
      <div className="container p-4">
      <button
          onClick={() => setFormVisible(!isFormVisible)}
          className="btn btn-primary btn-block"
          style={{
            backgroundColor: "#65F64D",
            border: "1px solid black",
            borderRadius: "10px",
            color: "black",
          }}
        >
          {isFormVisible ? "Ocultar" : "Agregar nuevo paciente"}
        </button>

        {isFormVisible && (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
                            value={newTask.lastName}
                            onChange={(e) => setNewTask({ ...newTask, lastName: e.target.value })}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Teléfono"
                            value={newTask.phone}
                            onChange={(e) => setNewTask({ ...newTask, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    {inputError && <p className="text-danger">{inputError}</p>}
                    <button
                      className="btn btn-success btn-block"
                      style={{
                        backgroundColor: "#65F64D",
                        border: "1px solid black",
                        borderRadius: "10px",
                        color: "black",
                        marginTop:"10px",
                      }}
                    >
                      Agregar nuevo paciente
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="card card-body mt-2"
          style={{ border: "2px solid black", borderRadius: "10px" }}
        >
          {tasks.length === 0 ? (
            <p className="text-center">No hay pacientes registrados</p>
          ) : (
            tasks.map((task: ITask) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: "#69F9F0",
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 style={{ textDecoration: task.done ? "line-through" : "" }}>
                    {task.name} {task.lastName}
                  </h2>
                  <p>Teléfono: {task.phone}</p>
                  <p>Fecha: {task.date}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#65F64D",
                      border: "1px solid black",
                      color: "black",
                      marginRight:"10px",
                      borderRadius: "10px"
                    }}
                    onClick={() => toggleDoneTask(task.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    style={{
                      backgroundColor: "#65F64D",
                      border: "1px solid black",
                      color: "black",
                      borderRadius: "10px"
                    }}
                    onClick={() => removeTask(task.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DocListPac;