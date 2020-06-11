import { blocklist } from "../constants";

const isBlocklisted = (file) => !!blocklist.find((term) => file.includes(term));

export default isBlocklisted;
