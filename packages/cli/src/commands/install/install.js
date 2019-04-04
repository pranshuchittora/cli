/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ContextT} from '../../tools/types.flow';
import logger from '../../tools/logger';
import * as PackageManager from '../../tools/PackageManager';
import link from '../link/link';
import loadConfig from '../../tools/config';

async function install(args: Array<string>, ctx: ContextT) {
  const name = args[0];

  logger.info(`Installing "${name}"...`);
  PackageManager.install([name]);

  // Reload configuration to see newly installed dependency
  const newConfig = loadConfig();

  logger.info(`Linking "${name}"...`);
  await link.func([name], newConfig, {platforms: undefined});

  logger.success(`Successfully installed and linked "${name}"`);
}

export default {
  func: install,
  description: 'install and link native dependencies',
  name: 'install <packageName>',
};