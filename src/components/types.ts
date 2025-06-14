export type FeaturedPost = {
  _id: string;
  title: string;
  description: string;
  HeaderImage: string;
  Imagecaption: string;
};

export type FeaturedPostResponse = {
  posts: FeaturedPost[];
};
