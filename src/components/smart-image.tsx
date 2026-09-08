import Image, { type ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export type SmartImageProps = Omit<ImageProps, "src"> & { src: string };

/**
 * Drop-in replacement for next/image that adds optional Cloudinary support:
 *
 *  - If NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set AND `src` is a bare
 *    Cloudinary public ID (no http/https prefix, e.g. "concerts/glass-animals-1"),
 *    it renders via <CldImage> — auto AVIF/WebP, responsive `sizes`, on-the-fly
 *    crops (see the "Adding images & videos" section of the README).
 *  - Otherwise it renders a plain next/image, so any full https URL (your own
 *    CDN, S3, picsum, loremflickr, etc.) keeps working with zero setup.
 */
export function SmartImage({ src, alt, ...props }: SmartImageProps) {
  const isCloudinaryPublicId = Boolean(CLOUDINARY_CLOUD_NAME) && !/^https?:\/\//.test(src);

  if (isCloudinaryPublicId) {
    return <CldImage src={src} alt={alt} {...props} />;
  }

  return <Image src={src} alt={alt} {...props} />;
}
