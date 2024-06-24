module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register'
  ],
  recursive: true,
  timeout: 5000,
  exit: true,
  spec: 'e2e/**/*.test.js'
};
