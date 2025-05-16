import React, { useEffect, useState } from 'react';
import { handleGetSubmit } from '../../services/Services';

function MsgForRetailer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await handleGetSubmit('api/Warehouse/msgs', 'Retailer Messages');
    if (response?.data?.result) {
      setMessages(response.data.result);
    }
  };

  // Map type to Bootstrap color classes (light variants)
  const getTypeClass = (type) => {
    switch (type) {
      case 'W':
        return 'border-warning bg-warning bg-opacity-10 text-warning';
      case 'R':
        return 'border-danger bg-danger bg-opacity-10 text-danger';
      case 'G':
        return 'border-success bg-success bg-opacity-10 text-success';
      default:
        return 'border-secondary bg-light text-secondary';
    }
  };

  return (
    <div className="container">
      <div className="card shadow border-0 my-4">
        <div className="card-header bg-gradient py-3" style={{ backgroundColor: '#a3dcff' }}>
          <h2 className="text-center py-2">Messages For Retailer</h2>
        </div>
        <div className="card-body p-4 bg-white">
          {messages.length === 0 ? (
            <div className="text-center text-muted">No messages found.</div>
          ) : (
            <div className="row g-4">
              {messages.map(msg => (
                <div className="col-12" key={msg.id}>
                  <div
                    className={`rounded shadow-sm p-3 border ${getTypeClass(msg.type)}`}
                    style={{ minHeight: 60, fontSize: '1.1rem', fontWeight: 500}}
                  >
                    <b style={{color:"black"}}>{msg.message}</b>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MsgForRetailer;