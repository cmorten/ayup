import { allowlist } from "../constants";

const isAllowlisted = (file) => !!allowlist.find((term) => file.includes(term));

export default isAllowlisted;
