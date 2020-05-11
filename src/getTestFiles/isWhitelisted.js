import { whitelist } from "../constants";

const isWhitelisted = (file) => !!whitelist.find((term) => file.includes(term));

export default isWhitelisted;
