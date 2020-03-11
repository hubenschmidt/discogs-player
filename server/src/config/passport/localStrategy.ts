import { Application } from 'express';
import * as passport from 'passport';
import passportLocal from 'passport-local';
// import _ from 'lodash';
import { User } from '../../models';

const LocalStrategy = passportLocal.Strategy;
