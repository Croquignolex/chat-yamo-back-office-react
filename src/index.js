import dayjs from "dayjs";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React, { Suspense, lazy } from "react";

import "./index.scss";
import { Layout } from "./utility/context/Layout";
import * as serviceWorker from "./serviceWorker";
import { store } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";

const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <Layout><LazyApp /></Layout>
        </Suspense>
    </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
