import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export default interface ILink {
  to: string;
  icon: IconDefinition;
  label: string;
  permission?: string;
}
