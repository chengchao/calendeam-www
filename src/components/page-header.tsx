import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  pretitle: string;
  pretitleHref?: string;
}

export default function PageHeader({
  pretitle,
  pretitleHref,
  title,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between border-b py-6">
      <div className="flex flex-col">
        <small className="mb-2 text-xs font-medium uppercase tracking-wider text-[#95aac9]">
          {pretitleHref ? (
            <Link href={pretitleHref} className="flex items-center gap-1">
              <ArrowLeft className="size-3" />
              {pretitle}
            </Link>
          ) : (
            <span>{pretitle}</span>
          )}
        </small>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      {children}
    </div>
  );
}
