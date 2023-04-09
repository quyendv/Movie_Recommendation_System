function SectionWrapper({ title, children, className = '' }) {
  return (
    // Wrapper ~ Container > TitleGroup + Children
    <div className={`mt-20 flex flex-col gap-8 ${className}`}>
      {title && (
        <div className="relative px-5 lg:px-0">
          {/* Title */}
          <h5 className="text-2xl font-bold uppercase text-skin-contrast">{title}</h5>

          {/* Line decoration (can refactor to pseudo element ::before, ::after): //TODO */}
          <div className="absolute left-5 top-full h-1.5 w-[100px] bg-skin-primary lg:left-0"></div>
        </div>
      )}
      <>{children}</>
    </div>
  );
}

export default SectionWrapper;
