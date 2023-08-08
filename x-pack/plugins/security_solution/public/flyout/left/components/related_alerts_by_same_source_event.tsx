/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiSkeletonText } from '@elastic/eui';
import type { TimelineEventsDetailsItem } from '@kbn/timelines-plugin/common';
import { CORRELATIONS_SAME_SOURCE_ALERTS } from '../../shared/translations';
import { EntityPanel } from '../../right/components/entity_panel';
import { useFetchRelatedAlertsBySameSourceEvent } from '../../shared/hooks/use_fetch_related_alerts_by_same_source_event';
import {
  CORRELATIONS_DETAILS_BY_SOURCE_SECTION_TEST_ID,
  CORRELATIONS_DETAILS_BY_SOURCE_TABLE_TEST_ID,
} from './test_ids';
import { AlertsTable } from './correlations_details_alerts_table';

const ICON = 'warning';

export interface RelatedAlertsBySameSourceEventProps {
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
export const RelatedAlertsBySameSourceEvent: React.VFC<RelatedAlertsBySameSourceEventProps> = ({
  dataFormattedForFieldBrowser,
  scopeId,
}) => {
  const { loading, error, data, dataCount } = useFetchRelatedAlertsBySameSourceEvent({
    dataFormattedForFieldBrowser,
    scopeId,
  });
  const title = `${dataCount} ${CORRELATIONS_SAME_SOURCE_ALERTS(dataCount)}`;

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
      data-test-subj={CORRELATIONS_DETAILS_BY_SOURCE_SECTION_TEST_ID}
    >
      <AlertsTable alertIds={data} data-test-subj={CORRELATIONS_DETAILS_BY_SOURCE_TABLE_TEST_ID} />
    </EntityPanel>
  );
};

RelatedAlertsBySameSourceEvent.displayName = 'RelatedAlertsBySameSourceEvent';
