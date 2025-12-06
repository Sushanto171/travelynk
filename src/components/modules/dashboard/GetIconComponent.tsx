import * as icons from "lucide-react";

export const getIconComponent = (iconName: string): icons.LucideIcon => {
  const icon = icons[iconName as keyof typeof icons];

  if (!icon) {
    return icons.HelpCircle;
  }
  return icon as icons.LucideIcon;
};
