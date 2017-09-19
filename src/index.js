import dva from 'dva';
import './utils/format';
import './index.less';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

app.model(require("./models/notify"));

app.model(require("./models/user"));

app.model(require("./models/route"));

// 2. Plugins
app.use(createLoading());

// 3. Model

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
