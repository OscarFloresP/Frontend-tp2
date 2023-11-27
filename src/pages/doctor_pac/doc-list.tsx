import { useState, useEffect } from "react";
import Footer from "../../Components/Dashboard/footer";
import Header from "../../Components/Dashboard/header";

const API = process.env.REACT_APP_API;

interface IPatients {
  _id: string;
  name: string;
  dni: number;
  email: string;
  //password:string;
  phone: string;
  age: number;
  contact_name: string;
  contact_phone: string;
}
interface DocListPacProps {
  appToken: string | null;
}
function DocListPac({ appToken }: DocListPacProps) {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [contact_name, setContact_name] = useState("");
  const [contact_phone, setContact_phone] = useState("");

  const [id, setId] = useState("");
  const [edit, setEdit] = useState<boolean>(false);

  const [patients, setPatients] = useState<IPatients[]>([]);

  const [nameError, setNameError] = useState<string>("");
  const [dniError, setDniError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [contact_nameError, setContactNameError] = useState<string>("");
  const [contact_phoneError, setContactPhoneError] = useState<string>("");
  const [formError, setFormError] = useState<string>('');

  const validateName = (value: string) => {
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
      setNameError(
        "El nombre no puede contener números ni caracteres especiales"
      );
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const validateDni = (value: string) => {
    const dniPattern = /^\d{8}$/;

    if (!dniPattern.test(value)) {
      setDniError("El DNI debe contener 8 dígitos numéricos");
      return false;
    } else {
      setDniError("");
      return true;
    }
  };

  const validatePhone = (value: string) => {
    const sevenDigitPattern = /^\d{7}$/;
    const nineDigitPattern = /^9\d{8}$/;

    if (!(sevenDigitPattern.test(value) || nineDigitPattern.test(value))) {
      setPhoneError("El teléfono no es valido");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };
  const validateAge = (value: string) => {
    const age = parseInt(value, 10);

    if (isNaN(age) || age <= 0 || age >= 18) {
      setAgeError("Debe ser un paciente pediatrico");
      return false;
    } else {
      setAgeError("");
      return true;
    }
  };
  const validateContactName = (value: string) => {
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
      setContactNameError("El nombre del tutor es invalido");
      return false;
    } else {
      setContactNameError("");
      return true;
    }
  };

  const validateContactPhone = (value: string) => {
    const sevenDigitPattern = /^\d{7}$/;
    const nineDigitPattern = /^9\d{8}$/;

    if (!(sevenDigitPattern.test(value) || nineDigitPattern.test(value))) {
      setContactPhoneError("El teléfono no es valido");
      return false;
    } else {
      setContactPhoneError("");
      return true;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDni(value);
    validateDni(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value);
    validateAge(value);
  };
  const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact_name(value);
    validateContactName(value);
  };

  const handleContactPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact_phone(value);
    validateContactPhone(value);
  };

  const validateForm = () => {
    if (
      !validateName(name) ||
      !validateDni(dni) ||
      !validatePhone(phone) ||
      !validateAge(age) ||
      !validateContactName(contact_name) ||
      !validateContactPhone(contact_phone)
    ) {
      setFormError('');
      return false;
    } else {
      setFormError('');
      return true;
    }
  };

  const patientPost = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }

    if (!edit) {
      const res = await fetch(`${API}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify({
          name,
          dni,
          email,
          phone,
          age,
          contact_name,
          contact_phone,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify({
          name,
          dni,
          email,
          phone,
          age,
          contact_name,
          contact_phone,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEdit(false);
      setId("");
    }

    await getPatients();

    setName("");
    setEmail("");
    setDni("");
    //setPassword('');
    setPhone("");
    setAge("");
    setContact_name("");
    setContact_phone("");
  };

  const getPatients = async () => {
    const res = await fetch(`${API}/patients`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();

    setPatients(data);
  };
  useEffect(() => {
    getPatients();
  }, []);

  const editPatient = async (id: string) => {
    const res = await fetch(`${API}/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });
    const data = await res.json();
    console.log(id);
    setEdit(true);
    setId(id);

    setName(data.name);
    setEmail(data.email);
    setDni(data.dni);
    setPhone(data.phone);
    setAge(data.age);
    setContact_name(data.contact_name);
    setContact_phone(data.contact_phone);
  };
  const deletePatient = async (id: string) => {
    const userResponse = window.confirm("Seguro que quieres borrarlo?");
    if (userResponse) {
      const res = await fetch(`${API}/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
        method: "DELETE",
      });
      await res.json();
      await getPatients();
    }
  };

  return (
    <>
      <Header appToken={appToken} />
      <div className="container p-4">
        <button
          onClick={() => setFormVisible(!isFormVisible)}
          className="btn btn-primary btn-block"
          style={{
            marginBottom: "20px",
          }}
        >
          {isFormVisible ? "Ocultar formulario" : "Agregar nuevo paciente"}
        </button>

        {isFormVisible && (
          <div className="row" style={{ marginBottom: "30px" }}>
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                {formError && (
                    <div className="alert alert-danger" role="alert">
                      {formError}
                    </div>
                  )}
                  <form onSubmit={patientPost}>
                    <div className="form-group">
                      <div className="col">
                        <div className="row pt-2">
                          <input
                            type="text"
                            className={`form-control ${
                              nameError ? "is-invalid" : ""
                            }`}
                            placeholder="Nombre completo"
                            value={name}
                            onChange={handleNameChange}
                          />
                          {nameError && (
                            <div className="invalid-feedback">{nameError}</div>
                          )}
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className={`form-control ${
                              dniError ? "is-invalid" : ""
                            }`}
                            placeholder="DNI"
                            value={dni}
                            onChange={handleDniChange}
                          />
                          {dniError && (
                            <div className="invalid-feedback">{dniError}</div>
                          )}
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
                            type="text"
                            className={`form-control ${
                              phoneError ? "is-invalid" : ""
                            }`}
                            placeholder="Telefono"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                          {phoneError && (
                            <div className="invalid-feedback">{phoneError}</div>
                          )}
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className={`form-control ${
                              ageError ? "is-invalid" : ""
                            }`}
                            placeholder="Edad"
                            value={age}
                            onChange={handleAgeChange}
                          />
                          {ageError && (
                            <div className="invalid-feedback">{ageError}</div>
                          )}
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className={`form-control ${
                              contact_nameError ? "is-invalid" : ""
                            }`}
                            placeholder="Nombre del tutor"
                            value={contact_name}
                            onChange={handleContactNameChange}
                          />
                          {contact_nameError && (
                            <div className="invalid-feedback">
                              {contact_nameError}
                            </div>
                          )}
                        </div>
                        <div className="row pt-2">
                          <input
                            type="text"
                            className={`form-control ${
                              contact_phoneError ? "is-invalid" : ""
                            }`}
                            placeholder="Numero del tutor"
                            value={contact_phone}
                            onChange={handleContactPhoneChange}
                          />
                          {contact_phoneError && (
                            <div className="invalid-feedback">
                              {contact_phoneError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-success btn-block"
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      {edit ? "Editar" : "Agregar nuevo paciente"}
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
            <>
              <p className="text-center">No hay pacientes registrados</p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </>
          ) : (
            patients.map((patient: IPatients) => (
              <div
                key={patient._id}
                style={{
                  //backgroundColor: "#69F9F0",
                  //border: "2px solid black",
                  //borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2>Nombre: {patient.name}</h2>
                  <p>DNI: {patient.dni}</p>
                  <p>Correo: {patient.email}</p>
                  {/* <p>Telefono: {patient.phone}</p>
                  <p>Edad: {patient.age}</p>
                  <p>Contacto: {patient.contact_name}</p>
                  <p>Numero del tutor: {patient.contact_phone}</p> */}
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      // backgroundColor: "#65F64D",
                      // border: "1px solid black",
                      // color: "black",
                      marginRight: "20px",
                      // borderRadius: "10px"
                    }}
                    onClick={(e) => editPatient(patient._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    style={{
                      // backgroundColor: "#65F64D",
                      // border: "1px solid black",
                      // color: "black",
                      marginRight: "20px",
                      // borderRadius: "10px"
                    }}
                    onClick={(e) => deletePatient(patient._id)}
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
