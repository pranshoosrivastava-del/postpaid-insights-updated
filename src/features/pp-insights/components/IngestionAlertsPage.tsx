import DataIngestionWidget from './DataIngestionWidget';

const IngestionAlertsPage = () => (
  <div className="w-full space-y-6 p-6">
    <header>
      <h1 className="text-3xl font-bold text-gray-900">Ingestion Alerts</h1>
      <p className="mt-1 text-sm text-gray-600">
        Monitor daily and monthly SFTP file ingestion and Data Warehouse pipelines.
      </p>
    </header>
    <div className="w-full">
      <DataIngestionWidget />
    </div>
  </div>
);

export default IngestionAlertsPage;
