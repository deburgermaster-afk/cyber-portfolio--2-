// Visitor tracking - sends notification when someone visits your portfolio

(function() {
  // Don't track if already tracked this session
  if (sessionStorage.getItem('portfolio_tracked')) return;
  
  // Get device and browser info
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      if (/iPhone/.test(ua)) return 'iPhone';
      if (/iPad/.test(ua)) return 'iPad';
      if (/Android/.test(ua)) return 'Android Device';
      return 'Mobile Device';
    }
    if (/Windows/.test(ua)) return 'Windows PC';
    if (/Mac/.test(ua)) return 'Mac';
    if (/Linux/.test(ua)) return 'Linux PC';
    return 'Desktop';
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    if (/Chrome/.test(ua) && !/Edg/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Firefox/.test(ua)) return 'Firefox';
    if (/Edg/.test(ua)) return 'Edge';
    if (/Opera|OPR/.test(ua)) return 'Opera';
    return 'Unknown Browser';
  };

  // Send notification
  const notifyVisitor = async () => {
    try {
      await fetch('/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device: getDeviceInfo(),
          browser: getBrowserInfo(),
          page: window.location.pathname || '/',
          screenSize: `${screen.width}x${screen.height}`,
          referrer: document.referrer || 'Direct',
        }),
      });
      
      // Mark as tracked for this session
      sessionStorage.setItem('portfolio_tracked', 'true');
    } catch (e) {
      // Silently fail - don't affect user experience
      console.log('Tracking skipped');
    }
  };

  // Wait a moment to ensure page is loaded, then track
  setTimeout(notifyVisitor, 2000);
})();
