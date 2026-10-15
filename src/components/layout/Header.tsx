import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Clock, Menu, Phone, X } from 'lucide-react';
import { BUSINESS_NAME, contact } from '../../data/contact';
import { services, getServiceDisplayName } from '../../data/services';
import { locations } from '../../data/locations';
import { assetUrl } from '../../lib/assetUrl';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-[15px] font-medium transition-colors ${
    isActive ? 'text-terracotta-700' : 'text-slate-700 hover:text-terracotta-700'
  }`;

function Dropdown({ label, to, items }: { label: string; to: string; items: { name: string; path: string }[] }) {
  return (
    <li className="group relative">
      <NavLink to={to} className={navLinkClass}>
        <span className="inline-flex items-center gap-1">
          {label}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
        </span>
      </NavLink>
      {/* Always in the DOM (and pre-rendered HTML) for crawlers; shown on hover/focus. */}
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="w-72 rounded-xl border border-sand-100 bg-white p-2 shadow-xl">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-sand-50 hover:text-terracotta-700"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const serviceItems = services.map((s) => ({ name: getServiceDisplayName(s), path: `/${s.slug}` }));
  const areaItems = locations.map((l) => ({ name: l.name, path: `/${l.slug}` }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      {/* Top bar */}
      <div className="hidden bg-slate-900 text-sm text-sand-100 md:block">
        <div className="container-site flex h-9 items-center justify-between">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-sand-300" aria-hidden="true" />
            {contact.hoursShort}
            <span className="text-sand-400">·</span>
            Serving {contact.serviceArea}
          </p>
          <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-sand-200">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${BUSINESS_NAME} home`}>
          <img
            src={assetUrl('/images/logo-320.webp')}
            srcSet={`${assetUrl('/images/logo-320.webp')} 320w, ${assetUrl('/images/logo-640.webp')} 640w`}
            sizes="(min-width: 1024px) 200px, 160px"
            alt={BUSINESS_NAME}
            width={320}
            height={105}
            className="h-12 w-auto lg:h-16"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <Dropdown label="Services" to="/services" items={serviceItems} />
            <Dropdown label="Service Areas" to="/service-areas" items={areaItems} />
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={navLinkClass}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold text-slate-900 hover:text-terracotta-700">
            <Phone className="h-4 w-4 text-terracotta-600" aria-hidden="true" />
            {contact.phone}
          </a>
          <Link to="/quote" className="btn-primary !py-2.5">
            Get Free Estimate
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={contact.phoneHref} className="rounded-lg p-2 text-terracotta-700" aria-label={`Call ${contact.phone}`}>
            <Phone className="h-6 w-6" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-7 w-7" aria-hidden="true" /> : <Menu className="h-7 w-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-sand-100 bg-white lg:hidden"
        >
          <div className="container-site space-y-6 py-6">
            <ul className="space-y-1 text-lg font-semibold">
              {[
                ['Home', '/'],
                ['All Services', '/services'],
                ['Service Areas', '/service-areas'],
                ['About', '/about'],
                ['Projects', '/projects'],
                ['Blog', '/blog'],
              ].map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="block rounded-lg px-2 py-2 text-slate-900 hover:bg-sand-50">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="eyebrow mb-2 px-2">Services</p>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {serviceItems.map((s) => (
                  <li key={s.path}>
                    <Link to={s.path} className="block rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sand-50">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2 px-2">Service Areas</p>
              <ul className="grid grid-cols-2 gap-1">
                {areaItems.map((a) => (
                  <li key={a.path}>
                    <Link to={a.path} className="block rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sand-50">
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={contact.phoneHref} className="btn-secondary">
                <Phone className="h-5 w-5" aria-hidden="true" /> {contact.phone}
              </a>
              <Link to="/quote" className="btn-primary">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
