"use client";

import React, { useState, useEffect } from "react";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcedureEditorProps {
  initialProcedure: string;
}

export default function ProcedureEditor({ initialProcedure }: ProcedureEditorProps) {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    try {
      const parsed = initialProcedure ? JSON.parse(initialProcedure) : [];
      // Ensure it is an array and sorted by step number
      if (Array.isArray(parsed)) {
        const sorted = [...parsed].sort((a, b) => (a.step || 0) - (b.step || 0));
        setSteps(sorted);
      } else {
        setSteps([]);
      }
    } catch (e) {
      console.error("Failed to parse initial procedure JSON:", e);
      setSteps([]);
    }
  }, [initialProcedure]);

  const updateStepsAndReindex = (newSteps: Step[]) => {
    const reindexed = newSteps.map((s, idx) => ({
      ...s,
      step: idx + 1,
    }));
    setSteps(reindexed);
  };

  const handleAddStep = () => {
    const newStep: Step = {
      step: steps.length + 1,
      title: "",
      description: "",
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, idx) => idx !== index);
    updateStepsAndReindex(newSteps);
  };

  const handleUpdateStep = (index: number, field: "title" | "description", value: string) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      [field]: value,
    };
    setSteps(newSteps);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[index - 1];
    newSteps[index - 1] = temp;
    updateStepsAndReindex(newSteps);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[index + 1];
    newSteps[index + 1] = temp;
    updateStepsAndReindex(newSteps);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-600">Alur Pendaftaran</label>
        <span className="text-[10px] text-slate-400 font-medium font-sans">
          {steps.length} Langkah
        </span>
      </div>

      {/* Hidden input to serialize the steps into the form submission */}
      <input type="hidden" name="procedure" value={JSON.stringify(steps)} />

      {steps.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-xs">
          Belum ada langkah alur. Klik tombol di bawah untuk menambahkan.
        </div>
      ) : (
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2.5 relative group shadow-sm transition hover:border-slate-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-[#0284c7] border border-sky-100 font-sans">
                  Langkah {item.step}
                </span>
                
                {/* Actions: Reorder and Delete */}
                <div className="flex items-center gap-1">
                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Pindahkan ke atas"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === steps.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Pindahkan ke bawah"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition ml-1 cursor-pointer"
                    title="Hapus langkah"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <input
                  type="text"
                  placeholder="Judul langkah (misal: Isi Formulir)"
                  value={item.title}
                  onChange={(e) => handleUpdateStep(index, "title", e.target.value)}
                  className="w-full px-2.5 py-1 border border-slate-200 rounded text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  required
                />
              </div>

              {/* Description Textarea */}
              <div>
                <textarea
                  placeholder="Keterangan alur langkah..."
                  value={item.description}
                  onChange={(e) => handleUpdateStep(index, "description", e.target.value)}
                  rows={2}
                  className="w-full px-2.5 py-1 border border-slate-200 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Step Button */}
      <button
        type="button"
        onClick={handleAddStep}
        className="w-full py-2 border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-md flex items-center justify-center gap-1 transition cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Langkah Alur
      </button>
    </div>
  );
}
