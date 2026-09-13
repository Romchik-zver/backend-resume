import { ID, ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';

@ObjectType()
export class SkillType {
  @Field() name: string;
  @Field() level: string;
}

@ObjectType()
export class ExperienceType {
  @Field() company: string;
  @Field() position: string;
  @Field() period: string;
  @Field() achievements: string;
}

@ObjectType()
export class ProjectType {
  @Field() name: string;
  @Field() repoUrl: string;
  @Field() stack: string;
  @Field() idea: string;
}

@ObjectType()
export class ProfileType {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() description: string;
  @Field() githubUrl: string;
  @Field() linkedinUrl: string;
  @Field(() => [SkillType]) skills: SkillType[];
  @Field(() => [ExperienceType]) experience: ExperienceType[];
  @Field(() => [ProjectType]) projects: ProjectType[];
}
