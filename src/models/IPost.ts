import IComment from "./IComment";

export default interface IPost {
  id: number;
  title: string;
  body: string;
  comments: IComment[];
}
