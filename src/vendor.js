/* eslint-disable */
import React from 'react';
import axios from 'axios';
import nprogress from 'nprogress';
import particles from 'particles.js';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import dva, { connect } from 'dva';
import * as router from 'dva/router';
import antd from 'antd';
const { message, Modal, Upload, notification, Button, Badge, Form, Spin, Input } = antd;
const { Router, Route, Switch, Redirect } = router;
