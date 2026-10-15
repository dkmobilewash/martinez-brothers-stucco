import { Link } from 'react-router-dom';
import { FileText, Phone } from 'lucide-react';
import { contact } from '../../data/contact';

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-sand-200 bg-white p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <a href={contact.phoneHref} className="btn-primary !py-3">
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
      <Link to="/quote" className="btn-secondary !py-3">
        <FileText className="h-5 w-5" aria-hidden="true" />
        Free Estimate
      </Link>
    </div>
  );
}
