// necessary only if swagger.ts file is in use
// In such usecase, controllers have also to be as below example
// @Controller(`${ControllerPrefix.ADMIN}/auth`)
// Globals prefix has to be used

export const API_PREFIX = 'api';

export enum ControllerPrefix {
  ADMIN = 'admin',
  PUBLIC = 'public-user',
}

// These are used to filter as filtered in swagger.ts
export const ADMIN_API_PATH = API_PREFIX?.startsWith('/')
  ? `${API_PREFIX}/${ControllerPrefix.ADMIN}`
  : API_PREFIX
    ? `/${API_PREFIX}/${ControllerPrefix.ADMIN}`
    : `/${ControllerPrefix.ADMIN}`;

export const PUBLIC_API_PATH = API_PREFIX?.startsWith('/')
  ? `${API_PREFIX}/${ControllerPrefix.PUBLIC}`
  : API_PREFIX
    ? `/${API_PREFIX}/${ControllerPrefix.PUBLIC}`
    : `/${ControllerPrefix.PUBLIC}`;
