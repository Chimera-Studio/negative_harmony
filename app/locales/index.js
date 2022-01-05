import get from "lodash/get";
import * as en from "./en.json";

const useLocale = (key) => {
  return get(en, key, key.toString());
};

export default useLocale;
