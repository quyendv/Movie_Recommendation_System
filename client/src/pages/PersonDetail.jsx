import PersonMediaGrid from '~/components/common/PersonMediaGrid';
import SectionWrapper from '~/components/common/SectionWrapper';

function PersonDetail() {
  return (
    // Wrapper (custom container: // TODO convert container default to this) > overview + mediaGrid
    <div className="main-section mt-header">
      {/* Person Overview */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Image */}
        <div className="w-1/2 lg:w-1/5">
          <div className="bg-[url('/src/assets/images/person-image.jpg')] bg-cover bg-center pt-[160%]" />
        </div>

        {/* Desc */}
        <div className="w-full px-0 py-4 lg:w-4/5 lg:px-8">
          <div className="flex flex-col space-y-4 text-skin-contrast">
            <h4 className="text-2xl font-bold">Sam Worthington (1976)</h4>
            <p className="typoLines font-medium [--lines:10]">
              Samuel Henry John Worthington (born 2 August 1976) is a British-Australian actor. He is best known for
              playing Jake Sully in Avatar, Marcus Wright in Terminator Salvation, and Perseus in Clash of the Titans
              and its sequel Wrath of the Titans. He later took more dramatic roles, appearing in The Debt (2010),
              Everest (2015), Hacksaw Ridge (2016), The Shack (2017), Manhunt: Unabomber (2017), and Fractured (2019).
              On television, he appeared in his native Australia as Howard in Love My Way and as Phillip Schuler in the
              television drama mini-series Deadline Gallipoli, for which he was also an executive producer. He voiced
              the protagonist, Captain Alex Mason, in the video game Call of Duty: Black Ops (2010), as well as its
              sequels Call of Duty: Black Ops II (2012), and Call of Duty: Black Ops 4 (2018). In 2022, he starred in
              the true crime miniseries Under the Banner of Heaven. In 2004, Worthington received Australia's highest
              film award for his lead role in Somersault.
            </p>
          </div>
        </div>
      </div>

      {/* PersonMediaGrid */}
      <SectionWrapper title={'Medias'}>
        <PersonMediaGrid personId={123456}/>
      </SectionWrapper>
    </div>
  );
}

export default PersonDetail;
