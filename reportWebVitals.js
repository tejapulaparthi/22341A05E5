const monitorPerformance = callback => {
  if (callback && typeof callback === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(callback);
      getFID(callback);
      getFCP(callback);
      getLCP(callback);
      getTTFB(callback);
    });
  }
};

export default monitorPerformance;
