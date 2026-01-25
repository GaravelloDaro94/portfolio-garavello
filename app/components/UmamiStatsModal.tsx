"use client";

import { useEffect, useState, useRef } from "react";

interface UmamiStats {
  pageviews: { value: number };
  visitors: { value: number };
  visits: { value: number };
  bounces: { value: number };
  totaltime: { value: number };
}

interface UmamiStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UmamiStatsModal({ isOpen, onClose }: Readonly<UmamiStatsModalProps>) {
  const [stats, setStats] = useState<UmamiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usar la API route en lugar de llamar directamente a Umami
        const response = await fetch('/api/umami-stats');

        if (!response.ok) {
          throw new Error('Error al obtener estadísticas');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog 
      ref={dialogRef}
      className="fixed inset-0 z-50 w-full max-w-2xl rounded-2xl p-0 bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <div className="relative w-full rounded-2xl p-6 sm:p-8 bg-white/90 dark:bg-dark-medium/90 backdrop-blur-md shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-light-text dark:text-dark-smoke hover:text-pink dark:hover:text-dark-blue-pastel transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-smoke mb-6">
          📊 Estadísticas del Portfolio
        </h2>

        {loading && (
          <div className="text-center py-8 text-light-text dark:text-gray-300">
            Cargando estadísticas...
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para ver las estadísticas, configura las variables de entorno en tu archivo .env.local
            </p>
          </div>
        )}

        {stats && !loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {stats.pageviews.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Vistas de página
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {stats.visitors.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Visitantes únicos
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {stats.visits.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Visitas totales
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {((1 - stats.bounces.value / stats.visits.value) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tasa de retención
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {Math.round(stats.totaltime.value / stats.visits.value / 60)}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tiempo promedio
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/50 dark:bg-dark-medium/60 backdrop-blur-sm">
              <div className="text-3xl font-bold text-pink dark:text-dark-blue-pastel">
                {(stats.pageviews.value / stats.visits.value).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Páginas por visita
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
          Estadísticas de los últimos 30 días
        </p>
      </div>
    </dialog>
  );
}
