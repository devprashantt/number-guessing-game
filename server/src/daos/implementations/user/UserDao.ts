import db from '../../../db/models/index';

import SuperDao from '../SuperDao';

const User = db.User;

export default class UserDao extends SuperDao {
  constructor() {
    super(User);
  }
}
