import React, { useEffect, useState } from 'react';
import numeral from 'numeral';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

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
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Suppliers" />
  ) : (
    <KpiTable
      title="Suppliers"
      overlayInfo="kasdlfa"
      headers={headers}
      data={tableData}
    />
  );
};

export default Suppliers;
