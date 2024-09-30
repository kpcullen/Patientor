import { assertNever } from '../../helpers';
import { Entry } from '../../types';
import HealthCheckView from './HealthCheckView';
import HospitalEntryView from './HospitalEntryView';
import OccupationHealthcareEntryView from './OccupationalHealthcareEntryView';

interface Props {
  entry: Entry;
  getDescription: (arg: string) => string;
}

const EntryDetailSorter = ({ entry, getDescription }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalEntryView entry={entry} getDescription={getDescription} />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationHealthcareEntryView
          entry={entry}
          getDescription={getDescription}
        />
      );
    case 'HealthCheck':
      return <HealthCheckView entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetailSorter;
