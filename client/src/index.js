import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./GirdSysTem.css";
import "./index.css";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZiXH1edXdQT2FeVUQ=');

ReactDOM.render(
<React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);
