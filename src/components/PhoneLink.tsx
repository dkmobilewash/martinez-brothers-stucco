import { Phone } from 'lucide-react';
import { contact } from '../data/contact';

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
  label?: string;
  iconClassName?: string;
}

export default function PhoneLink({ className, showIcon = true, label, iconClassName = 'h-4 w-4' }: PhoneLinkProps) {
  return (
    <a href={contact.phoneHref} className={className} aria-label={`Call ${contact.phone}`}>
      {showIcon && <Phone className={iconClassName} aria-hidden="true" />}
      <span>{label ?? contact.phone}</span>
    </a>
  );
}
