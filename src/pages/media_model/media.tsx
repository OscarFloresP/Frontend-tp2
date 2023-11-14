import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Dashboard/footer';
import Header from '../../Components/Dashboard/header';
import { useNavigate } from 'react-router-dom';

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
interface IUser{
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
  const [patient_id, setPatient_id] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [medias, setMedias] = useState<IMedia[]>([]);
  const [media_id, setMedia_id] = useState('');
  const [results_id, setResults_id] = useState('');



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const getPatient = async () => {
    const res = await fetch(`${API}/patients`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      }
    });
    const data = await res.json();
    setPatients(data);
  };

  const subida = async () => {
    const formData = new FormData();
    formData.append('file', file!);

    const res = await fetch(`${API}/medias`, {
      method: 'POST',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const res = await fetch(`${API}/medias`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      }
    });
    const data = await res.json();
    setMedias(data);
  };

  const getObservation = async () => {
    const res = await fetch(`${API}/observations`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      }
    });
    const data = await res.json();
    setObservations(data);
  };

  const deleteObservation = async (id: number) => {
    const userResponse = window.confirm('Seguro que quieres borrarlo?');
    if (userResponse) {
      const res = await fetch(`${API}/observations/${id}`, {
        headers: {
          Authorization: `Bearer ${appToken}`
      },
        method: 'DELETE',
      });
      await res.json();
      await getObservation();
    }
  };

  const createResult = async (observation_id: number, e: any) => {
    e.preventDefault();
    const res = await fetch(`${API}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken}`
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
    const res = await fetch(`${API}/results`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      }
    });
    const data = await res.json();
    setResults(data);
  };


  const getUser = async (): Promise<IUser> => {
    const res = await fetch(`${API}/get_user`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      }
    })
    const data = await res.json();
    console.log(data);
    return data;
  }
  // const getFileId = async () => {
  //   try {
  //     const res = await fetch(`${API}/files/${media_id}`);
  //     if (!res.ok) {
  //       console.error('Error fetching files:', res.statusText);
  //       return;
  //     }
  
  //     const data = await res.json();
  //     console.log(data);  // Verifica los datos recibidos
  //     console.log(media_id);
  //     //console.log('No carga');
  //     setFiles(data);
  //     console.log("soy files: "+files);
  //   } catch (error) {
  //     console.error('Error fetching files:', error);
  //   }
  // };
  

  useEffect(() => {
    getPatient();
    getUser();
    getMedias();
    getObservation();
    getResult();
  }, []);

  
  return (
    <>
      <Header appToken={appToken}/>
      <div className="container p-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="pt-4 pb-4">
              <input type="file" accept=".edf" onChange={handleFileChange} />
            </div>
            <button
              className="btn btn-success"
              style={{
                backgroundColor: '#65F64D',
                color: '#000',
                borderRadius: '10px',
                padding: '10px 10px',
              }}
              onClick={subida}
            >
              Entrenar modelo
            </button>
          </div>
        </div>
        <form onSubmit={observationPost}>
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
          <div>
            <button className="btn btn-secondary mb-3">
              Crear observacion
            </button>
          </div>
        </form>
        <div className="card card-body mt-2 pb-1">
          {observations.map((observation: IObservation) => (
            <div
              key={observation._id}
              className="card mb-4"
              style={{
                backgroundColor: '#69F9F0',
                border: '2px solid black',
                borderRadius: '12px',
              }}
            >
              <div style={{ padding: '10px 0px 0px 20px' }}>
                <h2>Paciente: {observation.patient_name}</h2>
                <p>Registro: {observation.file_name}</p>
                <p>Doctor: {observation.doctor_name}</p>
              </div>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: '#65F64D',
                  border: '1px solid black',
                  color: 'black',
                  borderRadius: '10px',
                }}
                onClick={(e) => createResult(observation._id, e)}
              >
                Crear resultado
              </button>
              <button
                className="btn btn-danger ml-2 "
                style={{
                  backgroundColor: '#65F64D',
                  border: '1px solid black',
                  color: 'black',
                  borderRadius: '10px',
                }}
                value={results_id}
                onClick={(e) => deleteObservation(observation._id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div>
          Tiempos:
          <br />
          {results.map((result: IResult) => (
            <div key={result._id}>
              <h3>
                {result.ictal_time && typeof result.ictal_time === 'string' ? (
                  <ul>
                    {JSON.parse(result.ictal_time).map(
                      (time: number[], index: number) => (
                        <li key={index}>
                          {`TI: ${time[0]} - TF: ${time[1]}`}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <span>Error: Formato de ictal_time incorrecto</span>
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Media;
