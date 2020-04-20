export const RECEIVE_USERS = 'RECEICE_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
