import { useState } from "react";

export default function ExperimentForm() {
  const [formData, setFormData] = useState({
    idExperimento: "",
    nombre: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
    hipotesis: "",
    objetivo: "",
    solucion: "",
    metricaPrincipal: "",
    metricaSecundaria: "",
    metricaInicial: "",
    grupo: "",
    resultadosMetricaPrincipal: "",
    resultadosMetricaSecundaria: "",
    descripcionIntervencion: "",
    resultadosCuantitativos: "",
    resultadosCualitativos: "",
    aprendizajes: "",
    decision: "",
    proximosPasos: "",
    links: "",
    notas: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://script.google.com/macros/s/AKfycbyRv2qtzd7MtpWasRKSZndKuT0U31eeNU4Hm57ra05I7b9vdlyRsWjA_QlZZBVSF7Qdfw/exec", {
        method: "POST",
        mode: "no-cors", // evita errores CORS
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Experimento registrado en Google Sheets!");
      setFormData({});
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar experimento");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Registro de Experimentos HabiCredit
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          
          {/* Campos principales */}
          <input type="text" name="idExperimento" placeholder="ID Experimento" value={formData.idExperimento} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="nombre" placeholder="Nombre del experimento *" required value={formData.nombre} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="responsable" placeholder="Responsable *" required value={formData.responsable} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="fechaInicio" required value={formData.fechaInicio} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} className="border p-2 rounded" />

          {/* Hipótesis / Objetivo / Solución */}
          <textarea name="hipotesis" placeholder="Hipótesis *" required value={formData.hipotesis} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="objetivo" placeholder="Objetivo *" required value={formData.objetivo} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="solucion" placeholder="Solución propuesta" value={formData.solucion} onChange={handleChange} className="border p-2 rounded" />

          {/* Métricas */}
          <input type="text" name="metricaPrincipal" placeholder="Métrica principal *" required value={formData.metricaPrincipal} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="metricaSecundaria" placeholder="Métrica secundaria" value={formData.metricaSecundaria} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="metricaInicial" placeholder="Métrica inicial" value={formData.metricaInicial} onChange={handleChange} className="border p-2 rounded" />

          {/* Grupo / Resultados */}
          <input type="text" name="grupo" placeholder="Grupo control/experimental" value={formData.grupo} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="resultadosMetricaPrincipal" placeholder="Resultados métrica principal" value={formData.resultadosMetricaPrincipal} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="resultadosMetricaSecundaria" placeholder="Resultados métrica secundaria" value={formData.resultadosMetricaSecundaria} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="descripcionIntervencion" placeholder="Descripción intervención" value={formData.descripcionIntervencion} onChange={handleChange} className="border p-2 rounded" />

          {/* Aprendizajes y cierre */}
          <textarea name="resultadosCuantitativos" placeholder="Resultados cuantitativos" value={formData.resultadosCuantitativos} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="resultadosCualitativos" placeholder="Resultados cualitativos" value={formData.resultadosCualitativos} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="aprendizajes" placeholder="Aprendizajes" value={formData.aprendizajes} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="decision" placeholder="Decisión" value={formData.decision} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="proximosPasos" placeholder="Próximos pasos" value={formData.proximosPasos} onChange={handleChange} className="border p-2 rounded" />

          {/* Links y notas */}
          <input type="url" name="links" placeholder="Links a data/reportes" value={formData.links} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="notas" placeholder="Notas adicionales" value={formData.notas} onChange={handleChange} className="border p-2 rounded" />

          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Registrar experimento
          </button>
        </form>
      </div>
    </div>
  );
}
