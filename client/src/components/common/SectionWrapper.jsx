import { forwardRef } from 'react';

function SectionWrapper({ title, children, className = '' }, ref) {
  return (
    // Wrapper ~ Container > TitleGroup + Children
    <div className={`mt-20 flex flex-col gap-8 ${className}`} ref={ref}>
      {title && (
        <div className="relative pl-5">
          {/* Title */}
          <h5 className="text-2xl font-bold uppercase text-skin-contrast">{title}</h5>

          {/* Line decoration (can refactor to pseudo element ::before, ::after) */}
          <div className="absolute left-0 top-0 h-full w-1.5 bg-skin-primary"></div>
        </div>
      )}
      <>{children}</>
    </div>
  );
}

export default forwardRef(SectionWrapper);
