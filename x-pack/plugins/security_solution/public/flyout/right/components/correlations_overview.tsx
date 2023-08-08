/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback } from 'react';
import { EuiButtonEmpty, EuiFlexGroup, EuiPanel } from '@elastic/eui';
import { useExpandableFlyoutContext } from '@kbn/expandable-flyout';
import { useShowRelatedAlertsBySession } from '../../shared/hooks/use_show_related_alerts_by_session';
import { RelatedAlertsBySession } from './related_alerts_by_session';
import { useShowRelatedAlertsBySameSourceEvent } from '../../shared/hooks/use_show_related_alerts_by_same_source_event';
import { RelatedAlertsBySameSourceEvent } from './related_alerts_by_same_source_event';
import { RelatedAlertsByAncestry } from './related_alerts_by_ancestry';
import { useShowRelatedAlertsByAncestry } from '../../shared/hooks/use_show_related_alerts_by_ancestry';
import { RelatedCases } from './related_cases';
import { INSIGHTS_CORRELATIONS_TEST_ID } from './test_ids';
import { InsightsSubSection } from './insights_subsection';
import { useRightPanelContext } from '../context';
import { CORRELATIONS_TEXT, CORRELATIONS_TITLE, VIEW_ALL } from './translations';
import { LeftPanelKey, LeftPanelInsightsTabPath } from '../../left';
import { useShowRelatedCases } from '../../shared/hooks/use_show_related_cases';

/**
 * Correlations section under Insights section, overview tab.
 * The component fetches the necessary data, then pass it down to the InsightsSubSection component for loading and error state,
 * and the SummaryPanel component for data rendering.
 */
export const CorrelationsOverview: React.FC = () => {
  const { eventId, indexName, dataAsNestedObject, dataFormattedForFieldBrowser, scopeId } =
    useRightPanelContext();
  const { openLeftPanel } = useExpandableFlyoutContext();

  const goToCorrelationsTab = useCallback(() => {
    openLeftPanel({
      id: LeftPanelKey,
      path: LeftPanelInsightsTabPath,
      params: {
        id: eventId,
        indexName,
        scopeId,
      },
    });
  }, [eventId, openLeftPanel, indexName, scopeId]);

  const showCases = useShowRelatedCases();
  const showAlertsByAncestry = useShowRelatedAlertsByAncestry({
    dataFormattedForFieldBrowser,
    dataAsNestedObject,
  });
  const showSameSourceAlerts = useShowRelatedAlertsBySameSourceEvent({
    dataFormattedForFieldBrowser,
  });
  const showAlertsBySession = useShowRelatedAlertsBySession({ dataFormattedForFieldBrowser });

  return (
    <InsightsSubSection title={CORRELATIONS_TITLE} data-test-subj={INSIGHTS_CORRELATIONS_TEST_ID}>
      <EuiPanel hasShadow={false} hasBorder={true} paddingSize="s">
        <EuiFlexGroup direction="column" gutterSize="none">
          {showAlertsByAncestry && (
            <RelatedAlertsByAncestry
              dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
              scopeId={scopeId}
            />
          )}
          {showSameSourceAlerts && (
            <RelatedAlertsBySameSourceEvent
              dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
              scopeId={scopeId}
            />
          )}
          {showAlertsBySession && (
            <RelatedAlertsBySession
              dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
              scopeId={scopeId}
            />
          )}
          {showCases && <RelatedCases eventId={eventId} />}
        </EuiFlexGroup>
      </EuiPanel>
      <EuiButtonEmpty
        onClick={goToCorrelationsTab}
        iconType="arrowStart"
        iconSide="left"
        size="s"
        data-test-subj={`${INSIGHTS_CORRELATIONS_TEST_ID}ViewAllButton`}
      >
        {VIEW_ALL(CORRELATIONS_TEXT)}
      </EuiButtonEmpty>
    </InsightsSubSection>
  );
};

CorrelationsOverview.displayName = 'CorrelationsOverview';
