import React from 'react';

const DeviceInfo = ({ device }) => {
  if (!device) return <p>Không có thông tin thiết bị.</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Thông tin thiết bị</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>ID:</strong>
          <p>{device.id?.id}</p>
        </div>
        <div>
          <strong>Tên:</strong>
          <p>{device.name}</p>
        </div>
        <div>
          <strong>Loại:</strong>
          <p>{device.type}</p>
        </div>
        <div>
          <strong>Nhãn (Label):</strong>
          <p>{device.label}</p>
        </div>
        <div>
          <strong>Profile:</strong>
          <p>{device.deviceProfileName}</p>
        </div>
        <div>
          <strong>Profile ID:</strong>
          <p>{device.deviceProfileId?.id}</p>
        </div>
        <div>
          <strong>Tenant ID:</strong>
          <p>{device.tenantId?.id}</p>
        </div>
        <div>
          <strong>Customer ID:</strong>
          <p>{device.customerId?.id}</p>
        </div>
        <div>
          <strong>Trạng thái:</strong>
          <p className={device.active ? "text-green-600" : "text-red-600"}>
            {device.active ? "Đang hoạt động" : "Không hoạt động"}
          </p>
        </div>
        <div>
          <strong>Thời gian tạo:</strong>
          <p>{new Date(device.createdTime).toLocaleString()}</p>
        </div>
        <div>
          <strong>Phiên bản:</strong>
          <p>{device.version}</p>
        </div>
        <div>
          <strong>Cấu hình:</strong>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(device.deviceData?.configuration, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Cấu hình truyền:</strong>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(device.deviceData?.transportConfiguration, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
