import { BRAND_ASSETS } from "@/content/media";
import { buildPublicAssetPath } from "@/content/url";

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`brand-lockup${light ? " brand-lockup-light" : ""}`}
      dir="ltr"
    >
      <span className="brand-mark-frame">
        <img
          src={buildPublicAssetPath(BRAND_ASSETS.icon)}
          alt=""
          width={48}
          height={48}
          className="brand-mark"
          decoding="async"
        />
      </span>
      <span className="brand-wordmark">
        Lecprima<span className="brand-wordmark-dot">.</span>
      </span>
    </span>
  );
}
