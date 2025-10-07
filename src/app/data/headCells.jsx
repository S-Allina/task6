import { useTranslation } from 'react-i18next';

export const useTableHeadCells = () => {
  const { t } = useTranslation(); // 'common' - namespace твоих файлов

  const headCells = [
    { id: 'expand', label: '', disablePadding: false, numeric: false },
    {
      id: 'Numeric',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'Name',
      numeric: false,
      disablePadding: false,
      label: t('name'),
    },
    {
      id: 'Artist',
      numeric: false,
      disablePadding: false,
      label: t('artist'),
    },
    {
      id: 'Album',
      numeric: false,
      disablePadding: false,
      label: t('album'),
    },
    {
      id: 'Genre',
      numeric: false,
      disablePadding: false,
      label: t('genre'),
    },
  ];

  return headCells;
};