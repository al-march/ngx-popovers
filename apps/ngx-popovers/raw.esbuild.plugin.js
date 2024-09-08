import * as path from 'path';
import { readFile } from 'node:fs/promises';

const cache = {};

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
      const cleanPath = args.path.replace(/\?raw$/, '');
      const fullPath = path.isAbsolute(cleanPath)
        ? cleanPath
        : path.resolve(args.resolveDir, cleanPath);

      let cacheId = getCacheId(fullPath);

      return {
        namespace: 'raw-file',
        path: `${fullPath}?${cacheId}`, // unique cacheId mark
        pluginData: {
          resolveDir: args.resolveDir
        }
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'raw-file' }, async (args) => {
      // remove timestamp mark
      const cleanPath = args.path.split('?')[0];
      const rawText = await readFile(cleanPath);
      const contents = rawText.toString();

      return {
        contents: contents,
        loader: 'text'
      };
    });
  }
};

function getCacheId(fullPath) {
  let timestamp;
  if (cache[fullPath]) {
    timestamp = cache[fullPath];
  } else {
    timestamp = Date.now();
    cache[fullPath] = timestamp;
  }
  return timestamp;
}

module.exports = rawPlugin;
