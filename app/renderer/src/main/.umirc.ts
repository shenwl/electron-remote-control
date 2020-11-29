import { defineConfig } from 'umi';
import { join } from 'path';
import slash from 'slash';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  externals(context: any, request: any, callback: any) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal: any = false;
    const load = [
      'electron',
      'fs',
      'path',
      'os',
      'url',
      'child_process'
    ];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    const appDeps = Object.keys(Object.assign({}, require('../../../../package.json').dependencies, require('../../../../package.json').devDependencies));
    if (appDeps.includes(request)) {
      const orininalPath = slash(join(__dirname, '../../../../node_modules', request));
      const requireAbsolute = `require('${orininalPath}')`;
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    callback(null, isExternal);
  },
});
