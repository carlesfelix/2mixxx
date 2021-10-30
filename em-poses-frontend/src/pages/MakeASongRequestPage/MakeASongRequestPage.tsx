import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/forms/ControlledInput';
import PageLayout from '../../components/PageLayout';
import './MakeASongRequestPage.scss';

export default function MakeASongRequestPage() {
  const { control } = useForm();
  return (
    <PageLayout toolbarTitle="Make a song request" toolbarLinkBack="/">
      <div className="MakeASongRequestPage">
        <form autoComplete="off" className="search-songs-form sub-toolbar">
          <div className="page-content">
            <ControlledInput
              control={control}
              field={{
                type: 'inputText',
                props: { placeholder: 'Search a song' }
              }}
              name="query"
              className="search-input"
            />
          </div>
        </form>
        <div className="page-content song-request-content">
          content here
        </div>
        <div className="song-request-footer sub-toolbar">
          <div className="page-content">
            <button className="btn btn-primary">
              Send request
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
