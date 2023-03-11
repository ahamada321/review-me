import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class Post {
  _id!: string;
  createdAt!: string;
  status!: string; // done, active, pending, draft

  postname!: string;
  description!: string;
  bottleneck!: string;
  privateOption!: boolean;

  course1Img!: string;
  course1Title!: string;
  course1Description!: string;
  course2Title!: string;
  course2Img!: string;
  course2Description!: string;
  memo!: string;

  image!: string;
  gallery1!: string;
  gallery2!: string;
  gallery3!: string;
  gallery4!: string;
  gallery5!: string;
  gallery6!: string;
  gallery7!: string;
  gallery8!: string;
  videoLink!: string;

  rating!: number;
  user!: any;
  brand!: any;
  favouritesFrom!: any[];
}
