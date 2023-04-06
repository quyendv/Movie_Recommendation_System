function CircleRate({ value = 75, size = 'small' }) {
  const circleSize = size === 'large' ? 70 : size === 'medium' ? 55 : 25;
  const crpSize = size === 'large' ? '150px' : size === 'medium' ? '120px' : '60px';
  const textNumberSize = size === 'large' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-base';

  const formatRate = (/** @type {number} */ value) => {
    const rate = value / 10;
    return rate.toFixed(1);
  };

  return (
    // .percent as wrapper > .dot + svg>circle*2 + .number
    <div
      className="relative h-crpSize w-crpSize"
      style={{
        // @ts-ignore // set css variable for dynamic classes
        '--dasharray': 440, // can move to index.scss
        '--value': value,
        '--crp-size': crpSize,
        // '--dashoffset': 'calc(var(--dasharray) - (var(--dasharray) * var(--value) / 100))',
      }}
    >
      {/* .dot is rectangle inset-5px (default 'large' - fit with circle) by .percent, :before is dot 10x10 (fixed for 3 types of size) (:before (dot) is at top center in .dot) */}
      <div className="absolute inset-[5px] z-10 rotate-[calc(3.6deg*var(--value))] animate-dotCrp before:absolute before:left-1/2 before:top-0 before:h-[10px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-crpColor before:[box-shadow:0_0_10px_2px_var(--crp-color),0_0_30px_1px_var(--crp-color)]"></div>

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
        {/* circle:nth-child(2) -> style for stroke-dasharray & dashoffset, animate follow by .dot with origin opacity-0 */}
        <circle
          pathLength={440}
          className="opacity-0 animate-fadeIn h-full w-full translate-x-[5px] translate-y-[5px] fill-transparent stroke-crpColor stroke-2 [stroke-dasharray:var(--dasharray)] [stroke-dashoffset:calc(var(--dasharray)-var(--dasharray)*var(--value)/100)]"
          cx={circleSize}
          cy={circleSize}
          r={circleSize}
        />
      </svg>

      {/* .number */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${textNumberSize} font-bold tracking-wider`}
      >
        {formatRate(value)}
      </div>
    </div>
  );
}

export default CircleRate;
