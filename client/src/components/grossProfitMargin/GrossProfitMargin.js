import React, { useEffect, useState } from 'react';
import KpiValue from '../kpiValue';

import { fetchGrossProfitMargin } from '../../services/financialService';
import ApiCallError from '../apiCallError';

const GrossProfitMargin = () => {
  const [margin, setMargin] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const response = await fetchGrossProfitMargin();
        setMargin(response.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Gross profit margin" />
  ) : (
    <KpiValue
      value={margin ? `${(margin * 100).toFixed(2)}` : '0'}
      unit="%"
      title="Gross profit margin"
      overlayInfo="akjfnlakdjhfals"
      format="0.000a"
    />
  );
};

export default GrossProfitMargin;
