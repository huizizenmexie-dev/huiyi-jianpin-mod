import { createElement, type ImgHTMLAttributes } from "react";
import { buildPublicAssetPath } from "@/content/url";

const imagePresets = {
  product: { widths: [400, 800, 1200], width: 1200, height: 1200 },
  editorial: { widths: [480, 960, 1536], width: 1536, height: 1024 },
} as const;

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes" | "width" | "height"
> & {
  /** Raw, unprefixed public WebP path from the shared media manifest. */
  src: string;
  preset: keyof typeof imagePresets;
  sizes: string;
  pictureClassName?: string;
};

/** Static picture markup lets the browser select one image before hydration. */
export default function ResponsiveImage({
  src,
  preset,
  sizes,
  pictureClassName = "",
  loading = "lazy",
  decoding = "async",
  ...imageProps
}: ResponsiveImageProps) {
  const { widths, width, height } = imagePresets[preset];
  const stem = src.replace(/\.webp$/, "");
  const srcSet = (format: "avif" | "webp") =>
    widths
      .map(candidate => {
        const rawPath =
          format === "webp" && candidate === width
            ? src
            : `${stem}-${candidate}.${format}`;
        return `${buildPublicAssetPath(rawPath)} ${candidate}w`;
      })
      .join(", ");

  return createElement(
    "picture",
    { className: `responsive-image ${pictureClassName}`.trim() },
    createElement("source", {
      type: "image/avif",
      srcSet: srcSet("avif"),
      sizes,
    }),
    createElement("img", {
      ...imageProps,
      src: buildPublicAssetPath(src),
      srcSet: srcSet("webp"),
      sizes,
      width,
      height,
      loading,
      decoding,
    })
  );
}
