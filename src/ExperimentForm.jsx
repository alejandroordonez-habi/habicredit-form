import { useState } from "react";

export default function ExperimentForm() {
  const [formData, setFormData] = useState({});
  const [openSection, setOpenSection] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("TU_ENDPOINT_DE_GOOGLE_APPS_SCRIPT", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Experimento registrado en Google Sheets!");
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar experimento");
    }
  };

  const inputClass =
    "border p-3 rounded-lg focus:ring-2 focus:ring-[#71EAD5] outline-none w-full";

  const Section = ({ title, children, id }) => (
    <div className="mb-4 border rounded-lg">
      <button
        type="button"
        onClick={() => setOpenSection(openSection === id ? null : id)}
        className="w-full text-left p-4 bg-gradient-to-r from-[#00A884] via-[#830eff] to-[#6640d3] text-white font-semibold rounded-t-lg"
      >
        {title}
      </button>
      {openSection === id && (
        <div className="p-4 bg-white space-y-3">{children}</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        
        {/* Header corporativo */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <img
            src="/habicredit-logo.png"
            alt="HabiCredit Logo"
            className="h-16"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00A884] via-[#830eff] to-[#6640d3] text-transparent bg-clip-text">
            Registro de Experimentos
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sección 1 */}
          <Section title="Información general" id="general">
            <input type="text" name="idExperimento" placeholder="ID Experimento" onChange={handleChange} className={inputClass} />
            <input type="text" name="nombre" placeholder="Nombre del experimento *" required onChange={handleChange} className={inputClass} />
            <input type="text" name="responsable" placeholder="Responsable *" required onChange={handleChange} className={inputClass} />
            <input type="date" name="fechaInicio" required onChange={handleChange} className={inputClass} />
            <input type="date" name="fechaFin" onChange={handleChange} className={inputClass} />
          </Section>

          {/* Sección 2 */}
          <Section title="Diseño del experimento" id="diseno">
            <textarea name="hipotesis" placeholder="Hipótesis *" required onChange={handleChange} className={inputClass} />
            <textarea name="objetivo" placeholder="Objetivo *" required onChange={handleChange} className={inputClass} />
            <textarea name="solucion" placeholder="Solución propuesta" onChange={handleChange} className={inputClass} />
            <input type="text" name="grupo" placeholder="Grupo control/experimental" onChange={handleChange} className={inputClass} />
            <textarea name="descripcionIntervencion" placeholder="Descripción intervención" onChange={handleChange} className={inputClass} />
          </Section>

          {/* Sección 3 */}
          <Section title="Métricas" id="metricas">
            <input type="text" name="metricaPrincipal" placeholder="Métrica principal *" required onChange={handleChange} className={inputClass} />
            <input type="text" name="metricaSecundaria" placeholder="Métrica secundaria" onChange={handleChange} className={inputClass} />
            <input type="text" name="metricaInicial" placeholder="Métrica inicial" onChange={handleChange} className={inputClass} />
          </Section>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#00A884] text-white font-bold py-3 rounded-lg hover:bg-[#6640d3] transition"
          >
            Registrar Experimento
          </button>
        </form>
      </div>
    </div>
  );
}
