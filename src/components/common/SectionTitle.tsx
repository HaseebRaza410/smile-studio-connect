import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionTitle = ({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 lg:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
