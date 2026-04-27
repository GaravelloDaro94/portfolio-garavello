import { useI18n } from "./useI18n";
import { NAV_SECTIONS, SectionId } from "../models";

export interface NavItem {
  id: SectionId;
  label: string;
}

export function useNavItems(): NavItem[] {
  const { t } = useI18n();

  return NAV_SECTIONS.map((id) => ({
    id,
    label: t.nav[id],
  }));
}
