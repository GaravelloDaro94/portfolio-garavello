// Tipos relacionados con navegación
export interface NavigationItem {
  id: string;
  label: string;
}

export type SectionId = "home" | "about" | "skills" | "projects" | "contact";
export type NavSectionId = Exclude<SectionId, "home">;

/** Todas las secciones observables por el IntersectionObserver */
export const ALL_SECTIONS: SectionId[] = ["home", "about", "skills", "projects", "contact"];

/** Secciones visibles en el nav (excluye home) */
export const NAV_SECTIONS: NavSectionId[] = ["about", "skills", "projects", "contact"];
