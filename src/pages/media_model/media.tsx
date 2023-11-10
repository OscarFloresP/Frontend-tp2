import React, { useState,useEffect } from 'react';
import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";

const API = process.env.REACT_APP_API;

interface IPatients {
    _id: string;
    name: string;
    dni:number;
    email:string;
    password:string;
    phone: string;
    age: number;
    contact_name: string;
    contact_phone: string;
  }

  interface IDoctors {
    _id: string;
    name: string;
    dni:number;
    email:string;
    password:string;
    phone: string;
    age: number;
  }

  interface IMedia{
    _id: string;
    name: string;
    result: string;
  }
function Media() {
  const [patients, setPatients] = useState<IPatients[]>([]);
  const [doctors,setDoctors] = useState<IDoctors[]>([]);
  
  const [patient_id, setPatient_id]=useState('');
  const [doctor_id, setDoctor_id]=useState('');
  const [file, setFile] = useState<File | null>(null);

  const [Medias, setMedias]= useState<IMedia[]>([]);
  const [media_id,setMedia_id]=useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };
  const getPatient = async () =>{
    const res = await fetch(`${API}/patients`);
    const data = await res.json();
    setPatients(data);
  }

  const getDoctor = async () =>{
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setDoctors(data);
  }

  const subida = async () => {
      const formData = new FormData();
  
      formData.append('patient_id', patient_id);
      formData.append('doctor_id', doctor_id);
      formData.append('file', file!);
  
      const res = await fetch(`${API}/medias`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      console.log(data);
  };
  
  useEffect(() => {
    getPatient();
  }, []);
  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <>
      <Header />
      <div className="container p-2">
        <div className="d-flex justify-content-between align-items-center">
        <div>
        <div className="pt-4 pb-4">
        <input
          type="file"
          accept=".edf"
          onChange={handleFileChange}
        />
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
  
        <div className="pt-4 pb-4">Paciente:<br/>
        <select onChange={(e) => setPatient_id(e.target.value)}>
  <option value="">Selecciona una opción</option>
  {patients.map((patient: IPatients) => (
    <option key={patient._id} value={patient._id}>
      {patient.name}
    </option>
  ))}
</select>
        </div>
        <div className="pt-4 pb-4">Doctor:<br/>
        <select onChange={(e) => setDoctor_id(e.target.value)}>
  <option value="">Selecciona una opción</option>
  {doctors.map((doctor: IDoctors) => (
    <option key={doctor._id} value={doctor._id}>
      {doctor.name}
    </option>
  ))}
</select>
        </div>
        {/* <div 
        className="card card-body mt-2 pb-10"
        style={{ border: "2px solid black", borderRadius: "10px" }}>
        </div> */}
        <div className="col-md-6">
        <table className="table">
          <thead>
            <tr>
              <th>Tiempo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Media;
