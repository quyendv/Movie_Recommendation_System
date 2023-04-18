function CircleRate({ value, size = 'small' }) {
  // Value is average by 10, eg: 7.5 not 75
  const circleSize = size === 'large' ? 70 : size === 'medium' ? 55 : 25;
  const crpSize = size === 'large' ? '150px' : size === 'medium' ? '120px' : '60px';
  const textNumberSize = size === 'large' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-base';

  return (
    // .percent as wrapper > .dot + svg>circle*2 + .number
    <div
      className="relative h-crpSize w-crpSize"
      style={{
        // @ts-ignore // set css variable for dynamic classes
        '--dasharray': 440, // can move to index.scss, equal to pathLengh in 'circle'
        '--value': value, // eg: --value is 75, value is 7.5
        '--crp-size': crpSize,
        // '--dashoffset': 'calc(var(--dasharray) - (var(--dasharray) * var(--value) / 10))',
      }}
    >
      {/* .dot is rectangle inset-5px (default 'large' - fit with circle) by .percent, :before is dot 10x10 (fixed for 3 types of size) (:before (dot) is at top center in .dot and move to value / 10 ~ rotate 360/10 * value) */}
      <div className="absolute inset-[5px] z-10 rotate-[calc(36deg*var(--value))] animate-dotCrp before:absolute before:left-1/2 before:top-0 before:h-[10px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-crpColor before:[box-shadow:0_0_10px_2px_var(--crp-color),0_0_30px_1px_var(--crp-color)]"></div>

      {/* SVG: rotate 270deg (-90deg) from right center to top center */}
      <svg className="relative h-crpSize w-crpSize -rotate-90">
        {/* if svg square 150px (default), circle square 140px (default) -> translate (5px, 5px) to center -> //TODO: restyle sizes */}
        <circle
          pathLength={440} // optional
          className="h-full w-full translate-x-[5px] translate-y-[5px] fill-transparent stroke-crpCircle1 stroke-2"
          cx={circleSize}
          cy={circleSize}
          r={circleSize}
        />
        {/* circle:nth-child(2) -> style for stroke-dasharray & dashoffset (% of value / 10 ~ remain of dasharray * value/10), animate follow by .dot with origin opacity-0 */}
        <circle
          pathLength={440}
          className="h-full w-full translate-x-[5px] translate-y-[5px] animate-fadeIn fill-transparent stroke-crpColor stroke-2 opacity-0 [stroke-dasharray:var(--dasharray)] [stroke-dashoffset:calc(var(--dasharray)-var(--dasharray)*var(--value)/10)]"
          cx={circleSize}
          cy={circleSize}
          r={circleSize}
        />
      </svg>

      {/* .number: //TODO animate number counter */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${textNumberSize} font-bold tracking-wider text-skin-contrast`}
      >
        {value?.toPrecision(2)} {/* or toFixed(1) */}
      </div>
    </div>
  );
}

export default CircleRate;
