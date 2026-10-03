export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
] as const;

export type StatusValue = (typeof STATUS_OPTIONS)[number]["value"];

export const statusLabels: Record<StatusValue, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
};

export const statusStyles: Record<StatusValue, string> = {
  new: "bg-brand/10 text-brand",
  contacted: "bg-cyan/15 text-cyan-700",
  in_progress: "bg-yellow/25 text-yellow-700",
  completed: "bg-[#25D366]/15 text-[#0F7A3D]",
};
