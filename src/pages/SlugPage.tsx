import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { getLocationBySlug } from '../data/locations';
import NotFoundPage from './NotFoundPage';

const ServiceDetailPage = lazy(() => import('./ServiceDetailPage'));
const LocationDetailPage = lazy(() => import('./LocationDetailPage'));

/** Resolves top-level /{slug} routes to a service, a location, or 404. */
export default function SlugPage() {
  const { slug = '' } = useParams();
  const service = getServiceBySlug(slug);
  if (service) return <ServiceDetailPage service={service} />;
  const location = getLocationBySlug(slug);
  if (location) return <LocationDetailPage location={location} />;
  return <NotFoundPage />;
}
