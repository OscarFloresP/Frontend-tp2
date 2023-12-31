import React, { useState, useEffect } from "react";
import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API;

interface IPatient {
  _id: string;
  name: string;
  dni: number;
  email: string;
  password: string;
  phone: string;
  age: number;
  contact_name: string;
  contact_phone: string;
}

interface IMedia {
  _id: string;
  file_name: string;
  time: string;
}

interface IObservation {
  _id: number;
  doctor_name: string;
  file_name: string;
  patient_name: string;
}

interface IResult {
  _id: number;
  doctor_name: string;
  ictal_time: number[];
  patient_name: string;
}
interface IUser {
  _id: number;
}

interface MediaProps {
  appToken: string | null;
}
function Media({ appToken }: MediaProps) {
  //console.log('Token en Media:', appToken);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [observations, setObservations] = useState<IObservation[]>([]);
  const [results, setResults] = useState<IResult[]>([]);
  const [patient_id, setPatient_id] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [medias, setMedias] = useState<IMedia[]>([]);
  const [media_id, setMedia_id] = useState("");
  const [results_id, setResults_id] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const getPatient = async () => {
    const res = await fetch(`${API}/patients`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    setPatients(data);
  };

  const subida = async () => {
    const formData = new FormData();
    formData.append("file", file!);

    const res = await fetch(`${API}/medias`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    getMedias();
  };

  const observationPost = async (e: any) => {
    e.preventDefault();
    const userRes = await getUser();
    const doctor_id = userRes._id;

    console.log(patient_id);
    console.log(media_id);
    console.log(doctor_id);

    const res = await fetch(`${API}/observations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appToken}`,
      },
      body: JSON.stringify({
        patient_id,
        doctor_id,
        media_id,
      }),
    });
    const data = await res.json();
    console.log(data);

    getObservation();
  };

  const getMedias = async () => {
    const res = await fetch(`${API}/medias`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    setMedias(data);
  };

  const getObservation = async () => {
    const res = await fetch(`${API}/observations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    setObservations(data);
  };

  const deleteObservation = async (id: number) => {
    const userResponse = window.confirm("Seguro que quieres borrarlo?");
    if (userResponse) {
      const res = await fetch(`${API}/observations/${id}`, {
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
        method: "DELETE",
      });
      await res.json();
      await getObservation();
    }
  };

  const createResult = async (observation_id: number, e: any) => {
    e.preventDefault();
    const res = await fetch(`${API}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appToken}`,
      },
      body: JSON.stringify({
        observation_id,
      }),
    });
    const data = await res.json();
    console.log(data);
    getResult();
  };

  const getResult = async () => {
    const res = await fetch(`${API}/results`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    setResults(data);
  };

  const getUser = async (): Promise<IUser> => {
    const res = await fetch(`${API}/get_user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  };
  function combinarIntervalos(intervalos: number[][]): number[][] {
    if (intervalos.length <= 1) {
      return intervalos;
    }

    // Ordenar intervalos por su inicio
    intervalos.sort((a, b) => a[0] - b[0]);

    const resultado: number[][] = [];
    let intervaloActual = intervalos[0];

    for (let i = 1; i < intervalos.length; i++) {
      const siguienteIntervalo = intervalos[i];

      if (intervaloActual[1] >= siguienteIntervalo[0]) {
        // Los intervalos se superponen o son adyacentes, combínalos
        intervaloActual = [
          intervaloActual[0],
          Math.max(intervaloActual[1], siguienteIntervalo[1]),
        ];
      } else {
        // Los intervalos no se superponen, añade el intervalo actual al resultado
        resultado.push(intervaloActual);
        intervaloActual = siguienteIntervalo;
      }
    }

    // Añadir el último intervalo al resultado
    resultado.push(intervaloActual);
    return mergeIntervals(resultado);
  }

  function mergeIntervals(intervals: number[][]): number[][] {
    if (intervals.length <= 1) {
      return intervals;
    }

    // Ordenar los intervalos por el inicio
    intervals.sort((a, b) => a[0] - b[0]);

    const result: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
      const currentInterval = result[result.length - 1];
      const nextInterval = intervals[i];

      // Verificar si los intervalos son adyacentes o se superponen
      if (currentInterval[1] >= nextInterval[0] - 1) {
        // Fusionar los intervalos adyacentes o superpuestos
        currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
      } else {
        // No son adyacentes ni superpuestos, agregar el intervalo actual a los resultados
        result.push([...nextInterval]);
      }
    }

    return result;
  }
  useEffect(() => {
    getPatient();
    getUser();
    getMedias();
    getObservation();
    getResult();
  }, []);

  return (
    <>
      <Header appToken={appToken} />
      <div className="container p-2">
        <div className="row">
          <div className="col-md-6">
            <div className="pt-4 pb-4">
              <input type="file" accept=".edf" onChange={handleFileChange} />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end">
            <button
              className="btn btn-primary"
              style={{
                // backgroundColor: '#65F64D',
                // color: '#000',
                //borderRadius: '10px',
                padding: "10px 10px",
              }}
              onClick={subida}
            >
              Cargar Archivo EEG
            </button>
          </div>
        </div>
        <form
          onSubmit={observationPost}
          style={{ marginBottom: "20px", borderTop: "2px solid #000" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-4">
              <div className="pt-4 pb-4">
                Paciente:
                <br />
                <select onChange={(e) => setPatient_id(e.target.value)}>
                  <option value="">Selecciona una opción</option>
                  {patients.map((patient: IPatient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <div className="pt-4 pb-4">
                Medias:
                <br />
                <select onChange={(e) => setMedia_id(e.target.value)}>
                  <option value="">Selecciona una opción</option>
                  {medias.map((media: IMedia) => (
                    <option key={media._id} value={media._id}>
                      {media.file_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <button
                className="btn btn-primary"
                style={{
                  // backgroundColor: '#65F64D',
                  // color: '#000',
                  padding: "10px 10px",
                  marginTop: "30px", // Adjust the margin-bottom value
                }}
              >
                Crear observación
              </button>
            </div>
          </div>
        </form>
        <h2 className="pt-5">Observaciones</h2>
        <div className="card card-body mt-2 pb-1">
          {observations.length === 0 ? (
            <p className="text-center">
              No hay observaciones disponibles.
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </p>
          ) : (
            observations.map((observation: IObservation) => (
              <div
                key={observation._id}
                className="card mb-4 alert alert-dismissible alert-light"
                style={{
                  // backgroundColor: '#69F9F0',
                  // border: '2px solid black',
                  // borderRadius: '12px',
                  padding: "15px",
                }}
              >
                <div style={{ padding: "10px 0px 0px 20px" }}>
                  <h2>Paciente: {observation.patient_name}</h2>
                  <p>Registro: {observation.file_name}</p>
                  <p>Doctor: {observation.doctor_name}</p>
                </div>
                <div className="row">
                  <div className="col col-3">
                    <button
                      className="btn btn-danger ml-2 "
                      style={
                        {
                          // backgroundColor: '#D15058',
                          // border: '1px solid black',
                          // color: 'black',
                          // borderRadius: '10px',
                        }
                      }
                      value={results_id}
                      onClick={(e) => deleteObservation(observation._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="col col-3">
                    <button
                      className="btn btn-primary"
                      // style={{
                      //   backgroundColor: '#65F64D',
                      //   border: '1px solid black',
                      //   color: 'black',
                      //   borderRadius: '10px',
                      // }}
                      onClick={(e) => createResult(observation._id, e)}
                    >
                      Crear resultado
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <br />
          {results.length === 0 ? (
            <p></p>
          ) : (
            <div>
              <h2 className="pt-5">Resultados del paciente</h2>
              resultados con un 90% de exactitud
              <div className="row">
                {results.map((result: IResult) =>
                  result.ictal_time && typeof result.ictal_time === "string" ? (
                    combinarIntervalos(JSON.parse(result.ictal_time)).map(
                      (time: number[], index: number) => (
                        <div className="col-md-3 pb-3" key={index}>
                          <div className="card text-white bg-success mb-3">
                            <div className="card-header">
                              Epilepsia ictal detectada
                            </div>
                            <div className="card-body">
                              <p className="card-text">{`Intervalo de tiempo en segundos ${time[0]} - ${time[1]}`}</p>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="col-md-3 pb-3" key={result._id}>
                      <span>Error: Formato de ictal_time incorrecto</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Media;
