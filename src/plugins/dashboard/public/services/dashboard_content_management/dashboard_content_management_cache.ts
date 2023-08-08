/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import LRUCache from 'lru-cache';
import { DashboardCrudTypes } from '../../../common/content_management';

export class DashboardContentManagementCache {
  private cache: LRUCache<string, DashboardCrudTypes['GetOut']>;

  constructor() {
    this.cache = new LRUCache<string, DashboardCrudTypes['GetOut']>({
      max: 100, // only store 100 dashboards
      maxAge: 1000 * 60 * 5, // 5 minutes
    });
  }

  /** Fetch the dashboard with `id` from the cache */
  public fetchDashboard(id: string) {
    return this.cache.get(id);
  }

  /** Add the fetched dashboard to the cache */
  public addDashboard({ item: dashboard, meta }: DashboardCrudTypes['GetOut']) {
    this.cache.set(dashboard.id, {
      meta,
      item: dashboard,
    });
  }

  /** Delete the dashboard with `id` from the cache */
  public deleteDashboard(id: string) {
    this.cache.del(id);
  }
}
