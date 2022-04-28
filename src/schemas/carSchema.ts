import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { customAlphabet } from "nanoid";
import { Field, ObjectType, InputType } from "type-graphql";
import { User } from "./userSchema";
import { IsNumber } from "class-validator";

const genId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

@ObjectType()
@index({ carId: 1 })
export class Car {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, default: () => `car_${genId()}`, unique: true })
  carId: string;

  @Field(() => String)
  @prop({ required: true })
  carName: string;

  @Field(() => String)
  @prop({ required: true })
  make: string;

  @Field(() => String)
  @prop({ required: true })
  model: string;

  //   @Field(() => String)
  //   name: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => Number)
  @prop({ required: true })
  year: number;

  @Field(() => String)
  @prop({ required: true })
  showroom: string;

  @Field(() => String)
  @prop({ required: true })
  selectedFile1: string;

  @Field(() => String)
  @prop({ required: true })
  selectedFile2: string;

  @Field(() => String)
  @prop({ required: true })
  selectedFile3: string;

  @Field(() => String)
  @prop({ required: true })
  selectedFile4: string;

  @Field(() => String)
  @prop({ required: true })
  selectedFile5: string;

  //   @Field(() => [String])
  //   @prop({ default: [] })
  //   likes: [string];
}

export const CarModel = getModelForClass<typeof Car>(Car);

@InputType()
export class CreateCarData {
  @Field()
  carName: string;

  @Field()
  make: string;

  @Field()
  model: string;

  @IsNumber()
  @Field()
  year: number;

  @Field()
  showroom: string;

  @Field()
  selectedFile1: string;

  @Field()
  selectedFile2: string;

  @Field()
  selectedFile3: string;

  @Field()
  selectedFile4: string;

  @Field()
  selectedFile5: string;
}

@InputType()
export class GetCarData {
  @Field()
  carId: string;
}
