import { useState, useEffect} from "react";
import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";

const API= process.env.REACT_APP_API

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

function DocListPac() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);


  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] =useState('');
  const [password,setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [contact_name, setContact_name] = useState('');
  const [contact_phone, setContact_phone] = useState('');

  const [id,setId] = useState('');
  const [edit,setEdit]=useState<boolean>(false);

  const [patients, setPatients] = useState<IPatients[]>([]);
  
  const pacientPost = async (e:any)=> {
      e.preventDefault();

      if(!edit){
        const res = await fetch(`${API}/patients`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            dni,
            email,
            password,
            phone,
            age,
            contact_name,
            contact_phone
          }),
        });
        await res.json();
      }else{
        const res = await fetch(`${API}/patient/${id}`,{
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            dni,
            email,
            password,
            phone,
            age,
            contact_name,
            contact_phone
          })
        })
        const data = await res.json();
        console.log(data);
        setEdit(false);
        setId('');
      }

      await getPatients();

      setName('');
      setEmail('');
      setDni('');
      setPassword('');
      setPhone('');
      setAge('');
      setContact_name('');
      setContact_phone('');
  }

  const getPatients = async ()=>{
    const res = await fetch(`${API}/patients`)
    const data = await res.json();
   
    setPatients(data);
  }
  useEffect(()=>{
    getPatients();
  },[])

  const editPatient = async (id:string) => {

    const res= await fetch(`${API}/patients/${id}`)
    const data = await res.json();

    setEdit(true)
    setId(id)

    setName(data.name);
    setEmail(data.email);
    setDni(data.dni);
    setPassword(data.password);
    setPhone(data.phone);
    setAge(data.age);
    setContact_name(data.contact_name);
    setContact_phone(data.contact_phone);

  }
  const deletePatient = async (id:string) => {

    const userResponse = window.confirm('Seguro que quieres borrarlo?')
    if (userResponse){
      const res = await fetch(`${API}/patients/${id}`,{
        method: 'DELETE'
      });
      await res.json();
      await getPatients();
    }
  }

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
                  <form onSubmit={pacientPost}>
                    <div className="form-group">
                      <div className="col">
                        <div className="row pt-2" >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Edad"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de contacto"
                            value={contact_name}
                            onChange={(e) => setContact_name(e.target.value)}
                          />
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Numero del contacto"
                            value={contact_phone}
                            onChange={(e) => setContact_phone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
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
                      {edit ? "Editar":"Agregar nuevo paciente"}
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
        {patients.length === 0 ? (
            <p className="text-center">No hay pacientes registrados</p>
          ) : 
          (patients.map((patient: IPatients) =>(
              <div key={patient._id}
              style={{
                backgroundColor: "#69F9F0",
                border: "2px solid black",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <h2>Nombre: {patient.name}</h2>
                  <p>DNI: {patient.dni}</p>
                  <p>Correo: {patient.email}</p>
                  <p>Telefono: {patient.phone}</p>
                  <p>Edad: {patient.age}</p>
                  <p>Contacto: {patient.contact_name}</p>
                  <p>Numero del tutor: {patient.contact_phone}</p>
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
                    onClick={(e) => editPatient(patient._id)}
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
                    onClick={(e) => deletePatient(patient._id)}
                  >
                    Eliminar
                  </button>
                </div>  
              </div>
          )))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DocListPac;