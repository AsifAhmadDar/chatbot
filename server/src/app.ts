import express from 'express';
import cors from 'cors'
import compression from 'compression';
import agent_router from './route/agent.route';
import user_router from './route/user.route';

const app = express();
app.use(cors({
  origin: "*"
}))
app.use(cors());
app.use(express.json())
app.use(compression());
app.use('/agent/', agent_router);
app.use('/user/', user_router);

export default app;


