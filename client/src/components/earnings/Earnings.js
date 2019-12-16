import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';

const Earnings = ({ year }) => {
  const [earnings, setEarnings] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchEarnings(year);
        setEarnings(data);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, [year]);

  return (
    <KpiValue
      value={earnings}
      unit="€"
      title="Net income"
      overlayInfo="nem sei se isto é relevante"
      format="0.000a"
      error={error}
    />
  );
};

Earnings.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Earnings);
