/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import {
  INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_ICON_TEST_ID,
  INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_VALUE_TEST_ID,
  INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_LOADING_TEST_ID,
} from './test_ids';
import { RelatedAlertsBySession } from './related_alerts_by_session';
import { useFetchRelatedAlertsBySession } from '../../shared/hooks/use_fetch_related_alerts_by_session';
import { mockDataFormattedForFieldBrowser } from '../mocks/mock_context';

jest.mock('../../shared/hooks/use_fetch_related_alerts_by_session');

const dataFormattedForFieldBrowser = mockDataFormattedForFieldBrowser;
const scopeId = 'scopeId';

describe('<RelatedAlertsBySession />', () => {
  it('should render many related alerts correctly', () => {
    (useFetchRelatedAlertsBySession as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      dataCount: 2,
    });

    const { getByTestId } = render(
      <RelatedAlertsBySession
        dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
        scopeId={scopeId}
      />
    );
    expect(
      getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_ICON_TEST_ID)
    ).toBeInTheDocument();
    const value = getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_VALUE_TEST_ID);
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('2 alerts related by session');
    expect(
      getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_VALUE_TEST_ID)
    ).toBeInTheDocument();
  });

  it('should render single related alerts correctly', () => {
    (useFetchRelatedAlertsBySession as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      dataCount: 1,
    });

    const { getByTestId } = render(
      <RelatedAlertsBySession
        dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
        scopeId={scopeId}
      />
    );
    expect(
      getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_ICON_TEST_ID)
    ).toBeInTheDocument();
    const value = getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_VALUE_TEST_ID);
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('1 alert related by session');
    expect(
      getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_VALUE_TEST_ID)
    ).toBeInTheDocument();
  });

  it('should render loading skeleton', () => {
    (useFetchRelatedAlertsBySession as jest.Mock).mockReturnValue({
      loading: true,
    });

    const { getByTestId } = render(
      <RelatedAlertsBySession
        dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
        scopeId={scopeId}
      />
    );
    expect(
      getByTestId(INSIGHTS_CORRELATIONS_RELATED_ALERTS_BY_SESSION_LOADING_TEST_ID)
    ).toBeInTheDocument();
  });

  it('should render null if error', () => {
    (useFetchRelatedAlertsBySession as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
    });

    const { container } = render(
      <RelatedAlertsBySession
        dataFormattedForFieldBrowser={dataFormattedForFieldBrowser}
        scopeId={scopeId}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
