import React, { useEffect, useState } from 'react';
import numeral from 'numeral';

import KpiTable from '../kpiTable';

import { fetchSuppliers } from '../../services/purchasesService';

const headers = [
  { name: 'id', label: 'ID', link: 'suppliers' },
  { name: 'name', label: 'Name' },
  { name: 'value', label: 'Value (€)' },
  { name: 'units', label: 'Units' },
];

const Suppliers = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchSuppliers();
        setTableData(
          data.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            value: numeral(supplier.value).format('0.0a'),
            units: numeral(supplier.units).format('0.0a'),
          })),
        );
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <KpiTable
      title="Suppliers"
      overlayInfo="Information about the Suppliers: Name, Value and number of Units"
      headers={headers}
      data={tableData}
      error={error}
    />
  );
};

export default Suppliers;
