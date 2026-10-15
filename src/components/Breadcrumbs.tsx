import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

/** Visible breadcrumb trail (BreadcrumbList JSON-LD is emitted separately via pageMeta). */
export default function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  const all: BreadcrumbItem[] = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? 'text-white/80' : 'text-slate-500'}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {item.path && !last ? (
                <Link to={item.path} className={light ? 'hover:text-white' : 'hover:text-terracotta-700'}>
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={light ? 'text-white' : 'text-slate-800'}>
                  {item.name}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
