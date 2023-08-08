/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiSkeletonText } from '@elastic/eui';
import { CORRELATIONS_RELATED_CASES } from '../../shared/translations';
import { CorrelationsCasesTable } from './correlations_cases_table';
import { EntityPanel } from '../../right/components/entity_panel';
import { CORRELATIONS_DETAILS_CASES_SECTION_TEST_ID } from './test_ids';
import { useFetchRelatedCases } from '../../shared/hooks/use_fetch_related_cases';

const ICON = 'warning';

export interface RelatedCasesProps {
  /**
   * Id of the document
   */
  eventId: string;
}

/**
 *
 */
export const RelatedCases: React.VFC<RelatedCasesProps> = ({ eventId }) => {
  const { loading, error, data, dataCount } = useFetchRelatedCases({ eventId });
  const title = `${dataCount} ${CORRELATIONS_RELATED_CASES(dataCount)}`;

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
      data-test-subj={CORRELATIONS_DETAILS_CASES_SECTION_TEST_ID}
    >
      <CorrelationsCasesTable cases={data} />
    </EntityPanel>
  );
};

RelatedCases.displayName = 'RelatedCases';
