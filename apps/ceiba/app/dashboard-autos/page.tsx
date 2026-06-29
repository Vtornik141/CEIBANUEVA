"use client";

import { useRef, useState } from "react";
import type { DragEvent } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { Check, ImagePlus, Upload, X } from "lucide-react";
import { EMPTY_AUTO, type AutoData, type AutoErrors } from "./types";

type FotoEntry = { file: File; preview: string };

const MAX_FOTOS = 5;
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-5">
      <span
        className="block text-sm font-semibold mb-1.5 text-grafito"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {label} <span className="text-musgo">*</span>
      </span>
      {children}
    </label>
  );
}

function inputClass(invalid?: boolean) {
  return `w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition bg-crema-soft text-grafito border focus:border-musgo ${
    invalid ? "border-[1.5px] border-[#B4564E]" : "border-line"
  }`;
}

export default function DashboardAutosPage() {
  const [data, setData] = useState<AutoData>(EMPTY_AUTO);
  const [errors, setErrors] = useState<AutoErrors>({});
  const [fotos, setFotos] = useState<FotoEntry[]>([]);
  const [fotoError, setFotoError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof AutoData>(k: K, v: AutoData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  function addFiles(incoming: FileList | File[]) {
    const files = Array.from(incoming);
    const valid: FotoEntry[] = [];
    let error: string | null = null;

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = `"${file.name}" no es JPG ni PNG.`;
        continue;
      }
      if (file.size > MAX_SIZE) {
        error = `"${file.name}" supera los 10MB.`;
        continue;
      }
      valid.push({ file, preview: URL.createObjectURL(file) });
    }

    setFotoError(error);
    setFotos((prev) => [...prev, ...valid].slice(0, MAX_FOTOS));
  }

  function removeFoto(index: number) {
    setFotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function validate(): boolean {
    const e: AutoErrors = {};
    (Object.keys(EMPTY_AUTO) as (keyof AutoData)[]).forEach((key) => {
      if (!data[key].trim()) e[key] = true;
    });
    setErrors(e);

    if (fotos.length !== MAX_FOTOS) {
      setFotoError(`Subí exactamente ${MAX_FOTOS} fotos.`);
      return false;
    }
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSending(true);
    setSubmitError(null);
    try {
      const urls: string[] = [];
      for (const { file } of fotos) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/dashboard-autos/upload",
        });
        urls.push(blob.url);
      }

      const res = await fetch("/api/dashboard-autos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fotos: urls }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "No se pudo enviar la información.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Ocurrió un error al enviar. Intenta de nuevo."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div
        className="min-h-screen bg-crema flex items-center justify-center p-6"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center rounded-full mb-6 w-16 h-16 bg-musgo">
            <Check size={30} className="text-white" strokeWidth={3} />
          </div>
          <h1
            className="text-2xl font-bold mb-3 text-grafito"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Información enviada
          </h1>
          <p className="text-sm leading-relaxed text-grafito-soft">
            Recibimos los datos de{" "}
            <strong className="text-grafito">{data.nombreCompraventa}</strong> junto con
            las {MAX_FOTOS} fotos. Te llegará un correo con el detalle.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-crema py-12 px-4 sm:px-6"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-xs tracking-[0.3em] uppercase mb-3 text-musgo">
          Ceiba Visual · Dashboard
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight mb-2 text-grafito"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Nueva compraventa de auto
        </h1>
        <p className="text-sm text-grafito-soft mb-8">
          Completá los datos del vehículo y subí 5 fotos para registrarlo.
        </p>

        <div className="rounded-2xl p-6 sm:p-8 bg-white border border-line">
          <Field label="Nombre de la compraventa">
            <input
              value={data.nombreCompraventa}
              onChange={(e) => set("nombreCompraventa", e.target.value)}
              placeholder="Ej. AutoVentas El Progreso"
              className={inputClass(errors.nombreCompraventa)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Marca">
              <input
                value={data.marca}
                onChange={(e) => set("marca", e.target.value)}
                placeholder="Ej. Toyota, BMW"
                className={inputClass(errors.marca)}
              />
            </Field>
            <Field label="Tipo de vehículo">
              <input
                value={data.tipo}
                onChange={(e) => set("tipo", e.target.value)}
                placeholder="Ej. SUV, Sedán"
                className={inputClass(errors.tipo)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Motor">
              <input
                value={data.motor}
                onChange={(e) => set("motor", e.target.value)}
                placeholder="Ej. V8, 4cil"
                className={inputClass(errors.motor)}
              />
            </Field>
            <Field label="Kilometraje">
              <input
                type="number"
                min={0}
                value={data.kilometraje}
                onChange={(e) => set("kilometraje", e.target.value)}
                placeholder="Ej. 45000"
                className={inputClass(errors.kilometraje)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Transmisión">
              <select
                value={data.transmision}
                onChange={(e) => set("transmision", e.target.value)}
                className={inputClass(errors.transmision)}
              >
                <option value="">Selecciona...</option>
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </Field>
            <Field label="Precio (Q)">
              <input
                type="number"
                min={0}
                value={data.precio}
                onChange={(e) => set("precio", e.target.value)}
                placeholder="Ej. 85000"
                className={inputClass(errors.precio)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Pasajeros">
              <input
                type="number"
                min={0}
                value={data.pasajeros}
                onChange={(e) => set("pasajeros", e.target.value)}
                placeholder="Ej. 5"
                className={inputClass(errors.pasajeros)}
              />
            </Field>
            <Field label="Puertas">
              <input
                type="number"
                min={0}
                value={data.puertas}
                onChange={(e) => set("puertas", e.target.value)}
                placeholder="Ej. 4"
                className={inputClass(errors.puertas)}
              />
            </Field>
          </div>

          <Field label="Exterior e interior">
            <textarea
              value={data.exteriorInterior}
              onChange={(e) => set("exteriorInterior", e.target.value)}
              rows={4}
              placeholder="Describí el estado, color, detalles del exterior e interior..."
              className={`${inputClass(errors.exteriorInterior)} resize-none`}
            />
          </Field>

          <div className="mb-2">
            <span
              className="block text-sm font-semibold mb-1.5 text-grafito"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Fotos del vehículo <span className="text-musgo">*</span>
            </span>
            <span className="block text-xs mb-2 text-grafito-soft">
              Exactamente {MAX_FOTOS} fotos, formato JPG o PNG, máx. 10MB cada una.
            </span>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition mb-3 ${
              dragActive ? "border-musgo bg-musgo/5" : "border-line bg-crema-soft"
            }`}
          >
            <Upload size={22} className="mx-auto mb-2 text-musgo" />
            <p className="text-sm text-grafito-soft">
              Arrastrá las fotos aquí o <strong className="text-musgo">hacé clic</strong> para
              seleccionarlas
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {fotoError && (
            <div className="rounded-lg p-3 mb-3 text-sm bg-[#B4564E]/10 text-[#B4564E] border border-[#B4564E]/30">
              {fotoError}
            </div>
          )}

          <div className="grid grid-cols-5 gap-2 mb-6">
            {Array.from({ length: MAX_FOTOS }).map((_, i) => {
              const entry = fotos[i];
              return (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg border border-line bg-crema-soft overflow-hidden flex items-center justify-center"
                >
                  {entry ? (
                    <>
                      <Image
                        src={entry.preview}
                        alt={`Foto ${i + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFoto(i)}
                        className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-grafito/80 text-white"
                        aria-label={`Quitar foto ${i + 1}`}
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <ImagePlus size={18} className="text-line" />
                  )}
                </div>
              );
            })}
          </div>

          {submitError && (
            <div className="rounded-lg p-3 mb-4 text-sm bg-[#B4564E]/10 text-[#B4564E] border border-[#B4564E]/30">
              {submitError}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={sending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.01] bg-musgo text-white disabled:opacity-70 disabled:hover:scale-100"
          >
            {sending ? "Enviando..." : "Enviar información"}
          </button>
        </div>
      </div>
    </div>
  );
}
