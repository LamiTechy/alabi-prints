import { getIcon } from "@/lib/icons";
import { trustStrip } from "@/data/site";

export function TrustStrip() {
  return (
    <section aria-label="Why clients trust us" className="border-b border-ink/8 bg-white">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
        {trustStrip.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-paper text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-ink sm:text-base">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-ink/55 sm:text-sm">
                  {item.detail}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
