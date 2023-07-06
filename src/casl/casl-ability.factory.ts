import { Injectable } from '@nestjs/common';
import {
  createMongoAbility,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

export default createMongoAbility([
  { action: 'read', subject: 'Post' },
  {
    inverted: true,
    action: 'delete',
    subject: 'Post',
    conditions: { published: true },
  },
]);

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

// export type AppAbility = createMongoAbility<[Action, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: User) {
//     const rules = [];

//     if (user.isAdmin) {
//       rules.push({ action: 'manage', subject: 'all' }); // read-write access to everything
//     } else {
//       rules.push({ action: 'read', subject: 'all' }); // read-only access to everything
//     }

//     rules.push({
//       action: 'update',
//       subject: 'Article',
//       conditions: { authorId: user.id },
//     });
//     rules.push({
//       inverted: true,
//       action: 'delete',
//       subject: 'Article',
//       conditions: { isPublished: true },
//     });

//     return createMongoAbility(rules);
//   }
// }
