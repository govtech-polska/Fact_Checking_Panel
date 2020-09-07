import { combineReducers } from 'redux';
import { submissions } from 'storages/submissions/reducers';
import { auth } from 'storages/auth/reducers';
import { admin } from 'storages/admin/reducers';
import { user } from 'storages/user/reducers';
import { filters } from 'storages/filters/reducers';

export default combineReducers({
  auth,
  user,
  admin,
  filters,
  submissions
});
