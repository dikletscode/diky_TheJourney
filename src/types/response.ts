





export interface DataJourney {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  user: {
    fullname: string;
  };
  img_cover: string;
  img_cloudId: string;
}
