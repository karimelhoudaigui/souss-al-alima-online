export const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const videoAssets = {
  cursus: assetPath("/videos/cursus-bg-4k.mp4"),
  tradition: assetPath("/videos/tradition-bg-4k.mp4"),
};
