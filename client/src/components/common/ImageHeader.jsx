// @ts-nocheck
function ImageHeader({ imgPath }) {
  return (
    // Wrapper: (bg-attachment: fixed, z-index higher body and lower other elements in MediaDetail) + ::pseudo-element have overlay to top
    <div
      style={{
        '--backdrop-poster': `url(${imgPath})`,
      }}
      className={`backdrop-poster z-0 bg-fixed pt-[60%] before:absolute before:inset-0 before:bg-overlayToTop sm:pt-[40%] lg:pt-[35%]`}
    >
      <img alt="imgHeader" src="" />
    </div>
  );
}

export default ImageHeader;
