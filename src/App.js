import React, { useState } from 'react';

function App() {
  // Sesión 3: Control de inputs con useState 
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Validación en tiempo real 
  const validar = (name, value) => {
    let errorMsg = '';
    
    if (name === 'correo') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) errorMsg = 'Formato de correo inválido';
    }
    
    if (name === 'password') {
      if (value.length < 8) errorMsg = 'Mínimo 8 caracteres';
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validar(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.correo && !errors.password && formData.nombre) {
      alert("¡Formulario validado y enviado!");
      setFormData({ nombre: '', correo: '', password: '' });
    }
  };

  return (
    <div className="container mt-5"> {/* Clase container [cite: 86] */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow p-4 rounded-3">
            <h2 className="text-center mb-4 fw-bold">Registro UNEMI</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  className="form-control"
                  placeholder="Ej: Jeremy Cuadrado"
                  onChange={handleChange}
                  value={formData.nombre}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="correo"
                  className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                  placeholder="usuario@unemi.edu.ec"
                  onChange={handleChange}
                  value={formData.correo}
                  required
                />
                {/* Mensaje de error dinámico [cite: 91] */}
                {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Al menos 8 caracteres"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Registrar
              </button>
            </form>
          </div>
          <p className="text-center mt-3 text-muted">
            <small>Guía de Práctica G003 S05</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;