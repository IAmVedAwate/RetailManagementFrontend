import React, { useEffect, useState } from 'react';
import { handleGetSubmit } from '../../services/Services';

function FloatingAdvertisement({ show, onClose, adLocation }) {
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const response = await handleGetSubmit("api/admin/Advertisement", "Advertisement");
        if (response.data.isSuccess && response.data.result.length > 0) {
          const role = (localStorage.getItem('role') || '').toLowerCase();
          const now = new Date();

          // Only allow these adLocations
          const allowedLocations = ["Home", "Bill / Retailer", "Login / Signup"];

          // Filter ads by allowed location, audience (lowercase), and not expired
          const filteredAds = response.data.result.filter(ad =>
            allowedLocations.includes(ad.adLocation) &&
            ad.adLocation === adLocation &&
            (ad.targetAudience || '').toLowerCase() === role &&
            (!ad.dateExpiry || new Date(ad.dateExpiry) > now)
          );

          if (filteredAds.length > 0) {
            // Randomize
            const randomAd = filteredAds[Math.floor(Math.random() * filteredAds.length)];
            setCurrentAd(randomAd);
          } else {
            setCurrentAd(null);
          }
        } else {
          setCurrentAd(null);
        }
      } catch (error) {
        setCurrentAd(null);
      }
    };
    if (show) fetchAdvertisement();
  }, [show, adLocation]);

  if (!show || !currentAd) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 1055,
        background: "rgba(0,0,0,0.45)",
      }}
    >
      <div
        className="position-relative rounded shadow-lg overflow-hidden"
        style={{
          width: 700,
          maxWidth: "95vw",
          height: 250,
          background: `url('${currentAd.bannerImgPath}') center/cover no-repeat`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          border: "4px solid #fff",
        }}
      >
        {/* Close Button */}
        <button
          className="btn btn-light position-absolute"
          style={{ top: 10, right: 10, zIndex: 2, borderRadius: "50%", fontWeight: "bold" }}
          onClick={onClose}
        >
          &times;
        </button>
        {/* Overlay for details */}
        <div
          className="position-absolute w-100 h-100 d-flex flex-column justify-content-end"
          style={{
            left: 0,
            top: 0,
            background: "linear-gradient(180deg,rgba(0,0,0,0.1) 40%,rgba(0,0,0,0.7) 100%)",
            color: "#fff",
            padding: "1.5rem",
          }}
        >
          <div className="mb-2" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
            {currentAd.adContent}
          </div>
          {/* No location or date shown */}
          <div style={{ fontSize: "1rem" }}>
            <span>
              <i className="bi bi-people-fill"></i> <b>Audience:</b> {currentAd.targetAudience}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingAdvertisement;