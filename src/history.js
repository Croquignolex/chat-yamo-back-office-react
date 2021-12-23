import { createBrowserHistory } from "history";
export let history = createBrowserHistory({ basename: process.env.REACT_APP_RELATIVE_PATH });
