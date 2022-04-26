import {
  getModelForClass,
  index,
  prop,
  queryMethod,
  ReturnModelType,
  pre,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserData {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "Your password is too short",
  })
  @MaxLength(30, {
    message: "Your password is too long",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserData {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
