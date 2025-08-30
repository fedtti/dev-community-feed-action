import type { DevApi } from "./get.d";

export const get = async (): Promise<DevApi> => {
  try {
    return {} as DevApi; // TODO: @fedtti
  } catch (error) {
    throw new Error(``);
  }
};
