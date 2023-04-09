function ImageHeader({ imgPath }) {
  // const bgImg = 'bg-[url("' + imgPath + '")]';
  const bgImg = 'bg-[url("/src/assets/images/image-header.jpg")]'; // TODO: 

  return (
    // Wrapper: (bg-attachment: fixed, z-index higher body and lower other elements in MediaDetail) + ::pseudo-element have overlay to top
    <div
      className={`relative z-0 ${bgImg} bg-cover bg-fixed bg-top pt-[60%] before:absolute before:inset-0 before:bg-overlayToTop sm:pt-[40%] lg:pt-[35%]`}
    >
      <img alt="imgHeader" src="" />
    </div>
  );
}

export default ImageHeader;
