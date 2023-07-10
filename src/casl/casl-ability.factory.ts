import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from 'src/user/user.schema';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    if (user.isAdmin) {
      can('manage', 'all');
    } else {
      can('read', 'all');
    }

    if (user.claims.includes('EYDAP')) {
      can('update', 'EydapApn');
    }

    return build();
  }
}
