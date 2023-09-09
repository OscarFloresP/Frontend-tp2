import React, { useState,useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function DocListPac() {
  const [newTask, setNewTask] = useState<string>(" ");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement):void => {
    e.preventDefault(); 
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus()
  };

  const addTask = (name: string):void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number):void =>{
    const auxNewTasks:ITask[] = [...tasks];
    auxNewTasks[i].done= !auxNewTasks[i].done;
    setTasks(auxNewTasks);
  }

  const removeTask = (i: number):void => {
     const auxNewTasks:ITask[] = [...tasks];
     auxNewTasks.splice(i,1);
     setTasks(auxNewTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Agregar nuevo paciente</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done ? 'line-through': ''}}>{t.name}</h2>
              <div>
                {/* <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                  {t.done ? 'bien' : 'mal'}
                </button> */}
                <button className="btn btn-danger" onClick={() => removeTask(i)}>
                  Elminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocListPac;
