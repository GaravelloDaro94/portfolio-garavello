import { useI18n } from "./useI18n";
import { NAV_SECTIONS } from "../models";

type NavSectionId = (typeof NAV_SECTIONS)[number];

export interface NavItem {
  id: NavSectionId;
  label: string;
}

export function useNavItems(): NavItem[] {
  const { t } = useI18n();

  return NAV_SECTIONS.map((id) => ({
    id,
    label: t.nav[id],
  }));
}
