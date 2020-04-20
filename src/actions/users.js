export const RECEIVE_USERS = 'RECEICE_USSER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
