import React from 'react';
import Button from '../../../components/common/Button.jsx';
import { ORDER_ROUTES } from '../../../api/ApiRoutes.js';
import { toast } from 'react-toastify';

function getFilenameFromDisposition(header) {
  if (!header) return null;
  const match = header.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
  return match ? decodeURIComponent(match[1]) : null;
}

const ExportOrdersButton = () => {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(ORDER_ROUTES.EXPORT_ALL_ORDERS, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({ error: 'Export failed' }));
        toast.error(err.error || 'Failed to export orders');
        return;
      }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition');
      const filename = getFilenameFromDisposition(disposition) || `orders_${Date.now()}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Download started');
    } catch (err) {
      console.error('Export error', err);
      toast.error('Network error while exporting');
    }
  };

  return (
    <Button variant="secondary" onClick={handleExport}>
      Export data
    </Button>
  );
};

export default ExportOrdersButton;
