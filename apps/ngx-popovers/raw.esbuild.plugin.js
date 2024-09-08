import * as path from 'path';
import { readFile } from 'node:fs/promises';

/**
 * Plugin for importing files as raw text.
 *
 * @example
 * ```typescript
 * import config from './app.config.ts?raw'
 * ```
 *
 * The `?raw` postfix is required to indicate that the file should be loaded as raw text.
 */
const rawPlugin = {
  name: 'raw-file-loader',
  setup(build) {
    build.onResolve({ filter: /\?raw$/ }, (args) => {
      return {
        namespace: 'raw-file',
        path: args.path,
        pluginData: {
          resolveDir: args.resolveDir
        }
      };
    });
    build.onLoad({ filter: /\?raw$/, namespace: 'raw-file' }, async (args) => {
      const fullPath = path.isAbsolute(args.path)
        ? args.path
        : path.resolve(args.pluginData.resolveDir, args.path);

      console.log('fullPath', fullPath);

      const rawText = await readFile(fullPath.replace(/\?raw$/, ''));
      const contents = rawText.toString();

      return {
        contents: contents,
        loader: 'text'
      };
    });
  }
};


module.exports = rawPlugin;

