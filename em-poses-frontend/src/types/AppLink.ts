import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type AppLink = {
  to: string;
  icon: IconDefinition;
  label: string;
  permission?: string;
};

export default AppLink;
