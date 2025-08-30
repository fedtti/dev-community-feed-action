type User = {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
}

export interface DevApi {
  type_of: string;
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_at?: Date;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reations_count: number;
  page_views_count: number;
  published_timestamp?: Date;
  body_markdown: string;
  canonical_url: string;
  reading_time_minutes: number;
  user: User;
}
