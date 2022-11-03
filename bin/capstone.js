#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { CapstoneStack } = require('../lib/capstone-stack');

const app = new cdk.App();
new CapstoneStack(app, 'CapstoneStack');
