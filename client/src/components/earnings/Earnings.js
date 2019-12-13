import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';

const Earnings = () => {
  const [earnings, setEarnings] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchEarnings(2018);
    setEarnings(data);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <KpiValue
      value={earnings}
      unit="€"
      title="Earnings"
      overlayInfo="nem sei se isto é relevante"
    />
  );
};

export default Earnings;