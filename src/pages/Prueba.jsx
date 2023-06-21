import Layout from "../components/Layout";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Prueba(){
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
        <Layout>

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
        </Layout>
    )

}
export default Prueba