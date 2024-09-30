import { Diagnosis, Entry } from '../../types';
import EntryDetailSorter from './EntryDetailSorter';

interface Props {
  patientEntries: Entry[];
  diagnosesDescriptions: Diagnosis[];
}

const PatientEntries = ({ patientEntries, diagnosesDescriptions }: Props) => {
  const getDescription = (code: string): string => {
    if (diagnosesDescriptions) {
      const diagnosis = diagnosesDescriptions.find(
        (desc) => desc.code === code
      );
      return diagnosis ? diagnosis.name : 'No data found';
    }
    return 'No data found';
  };
  if (!patientEntries || patientEntries.length === 0) return null;

  return (
    <div>
      <h3>Entries</h3>
      {patientEntries.map((entry) => (
        <EntryDetailSorter
          key={entry.id}
          entry={entry}
          getDescription={getDescription}
        />
      ))}
    </div>
  );
};

export default PatientEntries;
