import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numeral from 'numeral';

import CustomCard from '../CustomCard';

import styles from './KpiAccountList.module.css';

const KpiAccountList = ({ title, overlayInfo, sections, data }) => {
  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      {sections.map(section => (
        <>
          <div className={styles.sectionTitleWrapper}>
            <h2
              className={classNames(
                styles.sectionTitle,
                section.highlight ? styles.highlight : '',
              )}
            >
              {section.title}
            </h2>
          </div>
          <ul className={styles.list}>
            {data
              .filter(item => item.section === section.title)
              .map(sectionItem => (
                <li className={styles.listItem} key={sectionItem.label}>
                  <strong className={styles.label}>{sectionItem.label}</strong>
                  <strong className={styles.description}>
                    {numeral(sectionItem.description).format(
                      sectionItem.format ? sectionItem.format : '€0,0.00',
                    )}{' '}
                    €
                  </strong>
                </li>
              ))}
          </ul>
        </>
      ))}
    </CustomCard>
  );
};

KpiAccountList.propTypes = {
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      highlight: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      description: PropTypes.string,
      format: PropTypes.string,
      section: PropTypes.string,
    }),
  ).isRequired,
};

export default KpiAccountList;
