// Tipos relacionados con navegación
export interface NavigationItem {
  id: string;
  label: string;
}

export type SectionId = "home" | "about" | "skills" | "projects" | "contact";

/** Todas las secciones observables por el IntersectionObserver */
export const ALL_SECTIONS: SectionId[] = ["home", "about", "skills", "projects", "contact"];

/** Secciones visibles en el nav (excluye home) */
export const NAV_SECTIONS: SectionId[] = ["about", "skills", "projects", "contact"];
