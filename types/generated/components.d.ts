import type { Schema, Struct } from '@strapi/strapi';

export interface MemberTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_member_team_members';
  info: {
    description: '';
    displayName: 'team.member';
  };
  attributes: {
    advisorLettor: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    education: Schema.Attribute.Enumeration<['bachelor', 'master']>;
    email: Schema.Attribute.String;
    major: Schema.Attribute.String;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    prefix: Schema.Attribute.Enumeration<['mr', 'ms']>;
    resume: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    studentCert: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    studentId: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    surname: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'member.team-member': MemberTeamMember;
    }
  }
}
