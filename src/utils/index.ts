import {v4 as uuid4} from "uuid"

export const getRandomUuid = () => uuid4().replace(/-/g, "");


