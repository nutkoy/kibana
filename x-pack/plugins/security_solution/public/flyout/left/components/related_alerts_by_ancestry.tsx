/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiSkeletonText } from '@elastic/eui';
import type { TimelineEventsDetailsItem } from '@kbn/timelines-plugin/common';
import { CORRELATIONS_ANCESTRY_ALERTS } from '../../shared/translations';
import { AlertsTable } from './correlations_details_alerts_table';
import { useFetchRelatedAlertsByAncestry } from '../../shared/hooks/use_fetch_related_alerts_by_ancestry';
import {
  CORRELATIONS_DETAILS_BY_ANCESTRY_SECTION_TEST_ID,
  CORRELATIONS_DETAILS_BY_ANCESTRY_TABLE_TEST_ID,
} from './test_ids';
import { EntityPanel } from '../../right/components/entity_panel';

const ICON = 'warning';

export interface RelatedAlertsByAncestryProps {
  /**
   * An array of field objects with category and value
   */
  dataFormattedForFieldBrowser: TimelineEventsDetailsItem[] | null;
  /**
   * Maintain backwards compatibility // TODO remove when possible
   */
  scopeId: string;
}

/**
 *
 */
export const RelatedAlertsByAncestry: React.VFC<RelatedAlertsByAncestryProps> = ({
  dataFormattedForFieldBrowser,
  scopeId,
}) => {
  const { loading, error, data, dataCount } = useFetchRelatedAlertsByAncestry({
    dataFormattedForFieldBrowser,
    scopeId,
  });
  const title = `${dataCount} ${CORRELATIONS_ANCESTRY_ALERTS(dataCount)}`;

  if (loading) {
    return <EuiSkeletonText lines={1} size="m" isLoading={loading} contentAriaLabel="Loading" />;
  }

  if (error) {
    return null;
  }

  return (
    <EntityPanel
      title={title}
      iconType={ICON}
      expandable={true}
      data-test-subj={CORRELATIONS_DETAILS_BY_ANCESTRY_SECTION_TEST_ID}
    >
      <AlertsTable
        alertIds={data}
        data-test-subj={CORRELATIONS_DETAILS_BY_ANCESTRY_TABLE_TEST_ID}
      />
    </EntityPanel>
  );
};

RelatedAlertsByAncestry.displayName = 'RelatedAlertsByAncestry';
