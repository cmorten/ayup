import { blacklist } from "../constants";

const isBlacklisted = (file) => !!blacklist.find((term) => file.includes(term));

export default isBlacklisted;
