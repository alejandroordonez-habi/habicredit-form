import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-habi.css";
import habiLogo from "./assets/habi-logo.png";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzprwLJg0xmFTU0SMBp3MkXX6C1kMkbNyWURv4kf3ga5oFsZOhW8vfI7VaVP7sMF-FyLA/exec";

let experimentCounter = 1;

export default function ExperimentForm() {
  const [openSection, setOpenSection] = useState(0);
  const [experimentId, setExperimentId] = useState("");

  // Estado único (con métricas iniciales separadas)
  const [formData, setFormData] = useState({
    idExperimento: "",
    nombre: "",
    responsable: "",
    fechaInicio: null,
    fechaFin: null,
    hipotesis: "",
    objetivo: "",
    solucion: "",
    grupo: "",
    metricaPrincipal: "",
    metricaSecundaria: "",
    metricaPrincipalInicial: "",
    metricaSecundariaInicial: ""
  });

  // Generar ID automático al cargar (frontend, como lo tenías)
  useEffect(() => {
    const newId = `HC-${String(experimentCounter).padStart(3, "0")}`;
    setExperimentId(newId);
    setFormData((prev) => ({ ...prev, idExperimento: newId }));
  }, []);

  // Guardar cambios al salir del input (evita lag al escribir)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar fechas directamente
  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  // Envío
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mezcla final: valores del estado + lo último escrito en el form (aunque no haya hecho blur)
    const fd = new FormData(e.target);
    const merged = {
      ...formData,
      nombre: fd.get("nombre") ?? formData.nombre,
      responsable: fd.get("responsable") ?? formData.responsable,
      hipotesis: fd.get("hipotesis") ?? formData.hipotesis,
      objetivo: fd.get("objetivo") ?? formData.objetivo,
      solucion: fd.get("solucion") ?? formData.solucion,
      grupo: fd.get("grupo") ?? formData.grupo,
      metricaPrincipal: fd.get("metricaPrincipal") ?? formData.metricaPrincipal,
      metricaSecundaria: fd.get("metricaSecundaria") ?? formData.metricaSecundaria,
      metricaPrincipalInicial:
        fd.get("metricaPrincipalInicial") ?? formData.metricaPrincipalInicial,
      metricaSecundariaInicial:
        fd.get("metricaSecundariaInicial") ?? formData.metricaSecundariaInicial
    };

    if (!merged.nombre || !merged.metricaPrincipal) {
      alert("⚠️ Debes llenar al menos Nombre del experimento y Métrica principal.");
      return;
    }

    const payload = {
      ...merged,
      fechaInicio: merged.fechaInicio ? merged.fechaInicio.toISOString().split("T")[0] : "",
      fechaFin: merged.fechaFin ? merged.fechaFin.toISOString().split("T")[0] : ""
    };

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        // 👇 sin headers para evitar preflight en local y mantener el comportamiento que ya funcionaba
        body: JSON.stringify(payload)
      });

      alert(`✅ Experimento ${experimentId} registrado!`);

      // Siguiente ID y limpiar campos
      experimentCounter += 1;
      const newId = `HC-${String(experimentCounter).padStart(3, "0")}`;
      setExperimentId(newId);
      setFormData({
        idExperimento: newId,
        nombre: "",
        responsable: "",
        fechaInicio: null,
        fechaFin: null,
        hipotesis: "",
        objetivo: "",
        solucion: "",
        grupo: "",
        metricaPrincipal: "",
        metricaSecundaria: "",
        metricaPrincipalInicial: "",
        metricaSecundariaInicial: ""
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar experimento");
    }
  };

  // Acordeón
  const Section = ({ title, children, index, gradient }) => (
    <motion.div layout className="rounded-2xl shadow-md hover:shadow-xl transition">
      <button
        type="button"
        className={`w-full text-left px-6 py-4 font-semibold text-white rounded-2xl ${gradient}`}
        onClick={() => setOpenSection(openSection === index ? null : index)}
      >
        {title}
      </button>
      <AnimatePresence initial={false}>
        {openSection === index && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden p-6 bg-white rounded-b-2xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Estilos
  const inputClass =
    "mt-1 w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#830eff]";
  const labelClass = "block text-sm font-medium text-gray-700 mt-4";

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center p-6 antialiased">
      <motion.div layout className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-10">
          <img src={habiLogo} alt="HabiCredit" className="h-12 mr-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#830eff] to-[#6640d3] bg-clip-text text-transparent">
            Registro de Experimentos
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información general */}
          <Section
            title="Información general"
            index={0}
            gradient="bg-gradient-to-r from-[#830eff] to-[#6640d3]"
          >
            <label className={labelClass}>ID Experimento</label>
            <input
              type="text"
              name="idExperimento"
              value={formData.idExperimento}
              readOnly
              className={inputClass}
            />

            <label className={labelClass}>Nombre del experimento</label>
            <input
              type="text"
              name="nombre"
              defaultValue={formData.nombre}
              placeholder="Ej: Test de canal digital"
              className={inputClass}
              onBlur={handleBlur}
            />

           <label className={labelClass}>Responsable</label>
<label className={labelClass}>Responsable</label>
<select
  name="responsable"
  value={formData.responsable}
  onChange={(e) => setFormData((prev) => ({ ...prev, responsable: e.target.value }))}
  className={inputClass}
>
  <option value="">-- Selecciona responsable --</option>
  <option value="Alberth Fabian Perez Mendivelso">Alberth Fabian Perez Mendivelso</option>
<option value="Alejandro Ordoñez Moreno">Alejandro Ordoñez Moreno</option>
  <option value="Ana Lucia Giron Quiroga">Ana Lucia Giron Quiroga</option>
  <option value="Angel Arnulfo Torres Robayo">Angel Arnulfo Torres Robayo</option>
  <option value="Daniel Bonilla Guevara">Daniel Bonilla Guevara</option>
  <option value="Dannia Isabel Loaiza Sierra">Dannia Isabel Loaiza Sierra</option>
  <option value="Emmanuel Herrera Pereda">Emmanuel Herrera Pereda</option>
  <option value="German Felipe Barrios Goyeneche">German Felipe Barrios Goyeneche</option>
  <option value="Ivan Ricardo Saavedra Villamil">Ivan Ricardo Saavedra Villamil</option>
  <option value="Jeinner Daniel Baez Mantilla">Jeinner Daniel Baez Mantilla</option>
  <option value="Johhan Stiwer Ramirez Alvarez">Johhan Stiwer Ramirez Alvarez</option>
  <option value="Juan Pablo Grimaldos Olivella">Juan Pablo Grimaldos Olivella</option>
  <option value="Maria Jose Niño Rodriguez">Maria Jose Niño Rodriguez</option>
</select>


            <label className={labelClass}>Fecha de inicio</label>
            <DatePicker
              selected={formData.fechaInicio}
              onChange={(date) => handleDateChange("fechaInicio", date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona fecha"
              className={inputClass}
            />

            <label className={labelClass}>Fecha de fin</label>
            <DatePicker
              selected={formData.fechaFin}
              onChange={(date) => handleDateChange("fechaFin", date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona fecha"
              className={inputClass}
            />
          </Section>

          {/* Diseño del experimento */}
          <Section
            title="Diseño del experimento"
            index={1}
            gradient="bg-gradient-to-r from-[#830eff] to-[#c093f8]"
          >
            <label className={labelClass}>Hipótesis</label>
            <textarea
              name="hipotesis"
              defaultValue={formData.hipotesis}
              onBlur={handleBlur}
              placeholder="¿Qué esperamos que ocurra?"
              className={inputClass}
            />

            <label className={labelClass}>Objetivo</label>
            <textarea
              name="objetivo"
              defaultValue={formData.objetivo}
              onBlur={handleBlur}
              placeholder="Meta principal del experimento"
              className={inputClass}
            />

            <label className={labelClass}>Solución propuesta</label>
            <textarea
              name="solucion"
              defaultValue={formData.solucion}
              onBlur={handleBlur}
              placeholder="¿Qué intervención o cambio se aplicará?"
              className={inputClass}
            />

            <label className={labelClass}>Grupo (Control/Experimental)</label>
            <input
              type="text"
              name="grupo"
              defaultValue={formData.grupo}
              onBlur={handleBlur}
              placeholder="Ej: Control / Tratamiento"
              className={inputClass}
            />
          </Section>

          {/* Métricas */}
          <Section
            title="Métricas"
            index={2}
            gradient="bg-gradient-to-r from-[#6640d3] to-[#c093f8]"
          >
            <label className={labelClass}>Métrica principal</label>
            <input
              type="text"
              name="metricaPrincipal"
              defaultValue={formData.metricaPrincipal}
              onBlur={handleBlur}
              placeholder="KPI clave"
              className={inputClass}
            />

            <label className={labelClass}>Métrica principal inicial</label>
            <input
              type="text"
              name="metricaPrincipalInicial"
              defaultValue={formData.metricaPrincipalInicial}
              onBlur={handleBlur}
              placeholder="Valor base (ej: 10%)"
              className={inputClass}
            />

            <label className={labelClass}>Métrica secundaria</label>
            <input
              type="text"
              name="metricaSecundaria"
              defaultValue={formData.metricaSecundaria}
              onBlur={handleBlur}
              placeholder="KPI complementario"
              className={inputClass}
            />

            <label className={labelClass}>Métrica secundaria inicial</label>
            <input
              type="text"
              name="metricaSecundariaInicial"
              defaultValue={formData.metricaSecundariaInicial}
              onBlur={handleBlur}
              placeholder="Valor base (ej: 3%)"
              className={inputClass}
            />
          </Section>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:opacity-90 shadow-md transition"
          >
            Registrar Experimento
          </button>
        </form>
      </motion.div>
    </div>
  );
}
