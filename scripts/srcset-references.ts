/** React SSR uses srcSet/imageSrcSet; HTML attributes are case-insensitive. */
export function srcsetReferences(html: string): string[] {
  return [...html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/gi)]
    .flatMap(match => match[1].split(",").map(candidate => candidate.trim().split(/\s+/)[0]));
}
