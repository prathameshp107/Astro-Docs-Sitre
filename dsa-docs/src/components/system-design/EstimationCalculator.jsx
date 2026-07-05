import { useState, useMemo } from 'react';

// Format bytes into human readable string
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'TB', 'PB', 'EB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format numbers into clean notation (e.g. 10M, 1.2B)
function formatCompactNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

export default function EstimationCalculator() {
  const [dau, setDau] = useState(10000000); // default 10M
  const [readsPerUser, setReadsPerUser] = useState(10);
  const [writesPerUser, setWritesPerUser] = useState(1);
  const [objectSize, setObjectSize] = useState(500); // default 500 bytes
  const [retentionYears, setRetentionYears] = useState(5);

  const stats = useMemo(() => {
    const dailyWrites = dau * writesPerUser;
    const dailyReads = dau * readsPerUser;

    const writeQps = Math.round(dailyWrites / 86400);
    const readQps = Math.round(dailyReads / 86400);

    const totalWriteQps = Math.max(1, writeQps);
    const totalReadQps = Math.max(1, readQps);

    const peakWriteQps = totalWriteQps * 2;
    const peakReadQps = totalReadQps * 2;

    const dailyWriteData = dailyWrites * objectSize;
    const dailyReadData = dailyReads * objectSize;

    const yearlyStorage = dailyWriteData * 365;
    const totalStorage = yearlyStorage * retentionYears;

    // Cache sizing rule of thumb: cache 20% of daily read volume
    const recommendedCacheSize = dailyReadData * 0.2;

    return {
      writeQps: totalWriteQps,
      readQps: totalReadQps,
      peakWriteQps,
      peakReadQps,
      dailyWriteData,
      dailyReadData,
      yearlyStorage,
      totalStorage,
      recommendedCacheSize,
    };
  }, [dau, readsPerUser, writesPerUser, objectSize, retentionYears]);

  const copyToClipboard = () => {
    const mdTable = `| Metric | User Inputs / Calculation | Result |
|---|---|---|
| **Daily Active Users (DAU)** | - | ${formatCompactNumber(dau)} |
| **Reads/Write Ratio** | ${readsPerUser}:${writesPerUser} | ${(readsPerUser / Math.max(1, writesPerUser)).toFixed(1)}:1 |
| **Avg Read QPS (Peak)** | ${stats.readQps} req/s | ${stats.peakReadQps} req/s |
| **Avg Write QPS (Peak)** | ${stats.writeQps} req/s | ${stats.peakWriteQps} req/s |
| **Daily Write Data** | ${formatCompactNumber(dau * writesPerUser)} writes × ${formatBytes(objectSize)} | ${formatBytes(stats.dailyWriteData)}/day |
| **Recommended Cache (20% reads)** | 20% of ${formatBytes(dau * readsPerUser * objectSize)} | ${formatBytes(stats.recommendedCacheSize)} |
| **Storage per Year** | ${formatBytes(stats.dailyWriteData)} × 365 days | ${formatBytes(stats.yearlyStorage)} |
| **Total Storage (${retentionYears} yrs)** | ${formatBytes(stats.yearlyStorage)} × ${retentionYears} yrs | ${formatBytes(stats.totalStorage)} |`;

    navigator.clipboard.writeText(mdTable).then(() => {
      alert('Markdown table copied to clipboard!');
    });
  };

  return (
    <div className="est-calc-card">
      <div className="est-calc-header">
        <div className="est-calc-title-group">
          <span className="est-calc-icon">🧮</span>
          <h3 className="est-calc-title">Capacity & Storage Estimator</h3>
        </div>
        <button className="est-calc-copy-btn" onClick={copyToClipboard} title="Copy as Markdown Table">
          Copy Table
        </button>
      </div>

      <div className="est-calc-body">
        {/* Sliders & Inputs Panel */}
        <div className="est-calc-inputs">
          {/* DAU */}
          <div className="est-calc-input-group">
            <div className="est-calc-label-row">
              <label>Daily Active Users (DAU)</label>
              <span className="est-calc-value">{formatCompactNumber(dau)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000000"
              step="1000"
              value={dau}
              onChange={(e) => setDau(parseInt(e.target.value))}
              className="est-calc-slider"
            />
            <div className="est-calc-slider-labels">
              <span>1K</span>
              <span>10M</span>
              <span>100M</span>
              <span>1B</span>
            </div>
          </div>

          {/* Reads per day */}
          <div className="est-calc-input-group">
            <div className="est-calc-label-row">
              <label>Reads per User / Day</label>
              <span className="est-calc-value">{readsPerUser}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="1"
              value={readsPerUser}
              onChange={(e) => setReadsPerUser(parseInt(e.target.value))}
              className="est-calc-slider"
            />
          </div>

          {/* Writes per day */}
          <div className="est-calc-input-group">
            <div className="est-calc-label-row">
              <label>Writes per User / Day</label>
              <span className="est-calc-value">{writesPerUser}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={writesPerUser}
              onChange={(e) => setWritesPerUser(parseInt(e.target.value))}
              className="est-calc-slider"
            />
          </div>

          {/* Object Size */}
          <div className="est-calc-input-group">
            <div className="est-calc-label-row">
              <label>Avg Object Size (Bytes)</label>
              <span className="est-calc-value">{formatBytes(objectSize)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="10485760" // 10MB
              step="100"
              value={objectSize}
              onChange={(e) => setObjectSize(parseInt(e.target.value))}
              className="est-calc-slider"
            />
            <div className="est-calc-slider-labels">
              <span>100 B</span>
              <span>1 KB</span>
              <span>100 KB</span>
              <span>1 MB</span>
              <span>10 MB</span>
            </div>
          </div>

          {/* Retention */}
          <div className="est-calc-input-group">
            <div className="est-calc-label-row">
              <label>Storage Retention (Years)</label>
              <span className="est-calc-value">{retentionYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={retentionYears}
              onChange={(e) => setRetentionYears(parseInt(e.target.value))}
              className="est-calc-slider"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="est-calc-results">
          {/* Section: Throughput */}
          <div className="est-calc-result-section">
            <h4 className="est-calc-section-title">Estimated Throughput</h4>
            <div className="est-calc-grid">
              <div className="est-calc-result-card">
                <span className="est-calc-result-label">Read QPS (Avg / Peak)</span>
                <span className="est-calc-result-val">
                  {stats.readQps.toLocaleString()} / <span className="highlight-val">{stats.peakReadQps.toLocaleString()}</span>
                </span>
              </div>
              <div className="est-calc-result-card">
                <span className="est-calc-result-label">Write QPS (Avg / Peak)</span>
                <span className="est-calc-result-val">
                  {stats.writeQps.toLocaleString()} / <span className="highlight-val">{stats.peakWriteQps.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Section: Bandwidth & Cache */}
          <div className="est-calc-result-section">
            <h4 className="est-calc-section-title">Bandwidth & Memory</h4>
            <div className="est-calc-grid">
              <div className="est-calc-result-card">
                <span className="est-calc-result-label">Network Inbound (Writes)</span>
                <span className="est-calc-result-val">{formatBytes(stats.dailyWriteData)} / day</span>
              </div>
              <div className="est-calc-result-card cache-recommendation">
                <span className="est-calc-result-label">Recommended Redis Cache</span>
                <span className="est-calc-result-val green-val">{formatBytes(stats.recommendedCacheSize)}</span>
                <span className="est-calc-result-desc">(Caching 20% of daily read volume)</span>
              </div>
            </div>
          </div>

          {/* Section: Storage */}
          <div className="est-calc-result-section">
            <h4 className="est-calc-section-title">Disk Storage Needs</h4>
            <div className="est-calc-grid">
              <div className="est-calc-result-card">
                <span className="est-calc-result-label">Storage / Year</span>
                <span className="est-calc-result-val">{formatBytes(stats.yearlyStorage)}</span>
              </div>
              <div className="est-calc-result-card total-storage">
                <span className="est-calc-result-label">Total Storage ({retentionYears} Years)</span>
                <span className="est-calc-result-val orange-val">{formatBytes(stats.totalStorage)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
