import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Parentesco() {
  const [apoderados, setApoderados] = useState([]);
  const [apoderadoSeleccionado, setApoderadoSeleccionado] = useState(null);
  const [tituloFormulario, setTituloFormulario] = useState('Nuevo');
  const [apoderadoId, setApoderadoId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');

  useEffect(() => {
    obtenerApoderados();
  }, []);

  const obtenerApoderados = () => {
    axios.get('http://localhost:8000/apoderado')
      .then(res => {
        setApoderados(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const mostrarApoderado = (id, index) => {
    axios.get(`http://localhost:8000/apoderado/${id}`)
      .then(res => {
        setApoderadoSeleccionado(index);
        setTituloFormulario('Editar');
        setApoderadoId(res.data.apoderado_id);
        setNombre(res.data.apoderado_nombre);
        setApellido(res.data.apoderado_apellido);
        setTelefono(res.data.apoderado_telefono);
        setDocumentoIdentidad(res.data.apoderado_documento_identidad);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const guardarApoderado = (e) => {
    e.preventDefault();

    const apoderadoData = {
      apoderado_nombre: nombre,
      apoderado_apellido: apellido,
      apoderado_telefono: telefono,
      apoderado_documento_identidad: documentoIdentidad,
    };

    if (apoderadoId > 0) {
      axios.put(`http://localhost:8000/apoderado/${apoderadoId}`, apoderadoData)
        .then(res => {
          const updatedApoderados = [...apoderados];
          updatedApoderados[apoderadoSeleccionado] = res.data;
          setApoderados(updatedApoderados);
          resetFormulario();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios.post('http://localhost:8000/apoderado', apoderadoData)
        .then(res => {
          const updatedApoderados = [...apoderados, res.data];
          setApoderados(updatedApoderados);
          resetFormulario();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const eliminarApoderado = (id) => {
    const confirmacion = window.confirm('¿Desea eliminar el apoderado?');
    if (confirmacion) {
      axios.delete(`http://localhost:8000/apoderado/${id}`)
        .then(res => {
          const updatedApoderados = apoderados.filter(apoderado => apoderado.apoderado_id !== id);
          setApoderados(updatedApoderados);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const resetFormulario = () => {
    setApoderadoSeleccionado(null);
    setTituloFormulario('Nuevo');
    setApoderadoId(0);
    setNombre('');
    setApellido('');
    setTelefono('');
    setDocumentoIdentidad('');
  };

  return(
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        
        <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
        
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
        
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
            </div>
        </form>
    
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#!">Settings</a></li>
                    <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">MODULOS</div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Usuarios
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Apoderados</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item active">Parentescos</li>
                    </ol>
                    <div className="card mb-4">
                        <div className="card-body">
                            <Container>
                                <Table striped bordered hover variant="light">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Nombre</th>
                                      <th>Apellido</th>
                                      <th>Teléfono</th>
                                      <th>Documento de Identidad</th>
                                      <th>Acciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {apoderados.map((apoderado, index) => (
                                      <tr key={apoderado.apoderado_id}>
                                        <td>{apoderado.apoderado_id}</td>
                                        <td>{apoderado.apoderado_nombre}</td>
                                        <td>{apoderado.apoderado_apellido}</td>
                                        <td>{apoderado.apoderado_telefono}</td>
                                        <td>{apoderado.apoderado_documento_identidad}</td>
                                        <td>
                                          <Button
                                            variant="success"
                                            onClick={() => mostrarApoderado(apoderado.apoderado_id, index)}
                                          >
                                            Editar
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() => eliminarApoderado(apoderado.apoderado_id)}
                                          >
                                            Eliminar
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                                <hr />
                                <h1>{tituloFormulario}</h1>
                                <Form onSubmit={guardarApoderado}>
                                  <Form.Control type="hidden" value={apoderadoId} />
                                  <Form.Group className="mb-3">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={nombre}
                                      onChange={(e) => setNombre(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Apellido:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={apellido}
                                      onChange={(e) => setApellido(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Teléfono:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={telefono}
                                      onChange={(e) => setTelefono(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Documento de Identidad:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={documentoIdentidad}
                                      onChange={(e) => setDocumentoIdentidad(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Button variant="primary" type="submit">
                                    Guardar
                                  </Button>
                                </Form>
                              </Container>
                        </div>
                    </div>
                    
                    <div className="card mb-4"><div className="card-body">When scrolling, the navigation stays at the top of the page. This is the end of the static navigation demo.</div></div>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Your Website 2022</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</>
);
}
export default Parentesco;
