export interface VideoDetailsPagePropsIf {
  params: Promise<{
    username: string;
    videoId: string;
  }>;
}
