// @ts-nocheck
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import personApi from '~/apis/person.api';
import PersonMediaGrid from '~/components/common/PersonMediaGrid';
import SectionWrapper from '~/components/common/SectionWrapper';
import tmdbConfigs from '~/configs/tmdb.configs';
import { setGlobalLoading } from '~/redux/features/globalSlice';

function PersonDetail() {
  const { personId } = useParams();
  const [person, setPerson] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.getDetail({ personId });
      dispatch(setGlobalLoading(false));

      console.log({ name: 'PersonDetail getPerson', response, err });

      // toast if err
      if (response) {
        setPerson(response);
      }
    };

    getPerson();
  }, []);

  const getYear = () => {
    // getYear of birthday, deathday // yyyy-mm-dd
    const yearOfBirth = person?.birthday?.split('-')[0];
    const yearOfDeath = person?.deathday?.split('-')[0];
    return yearOfDeath ? `(${yearOfBirth} - ${yearOfDeath})` : `(${yearOfBirth})`;
  };

  return (
    person && (
      <>
        {/* Wrapper (custom container: // TODO convert container default to this) > overview + mediaGrid */}
        <div className="main-section mt-header">
          {/* Person Overview */}
          <div className="relative flex flex-col lg:flex-row">
            {/* Image */}
            <div className="w-1/2 lg:w-1/5">
              <div
                style={{
                  '--backdrop-poster': `url(${tmdbConfigs.posterPath(person?.profile_path)})`,
                }}
                className="backdrop-poster pt-[160%]"
              />
            </div>

            {/* Desc */}
            <div className="w-full px-0 py-4 lg:w-4/5 lg:px-8">
              <div className="flex flex-col space-y-4 text-skin-contrast">
                <h4 className="text-2xl font-bold">
                  {person?.name} {getYear()}
                </h4>
                <p className="typoLines font-medium [--lines:10]">{person?.biography}</p>
              </div>
            </div>
          </div>

          {/* PersonMediaGrid */}
          <SectionWrapper title={'Medias'}>
            <PersonMediaGrid personId={personId} />
          </SectionWrapper>
        </div>
      </>
    )
  );
}

export default PersonDetail;
