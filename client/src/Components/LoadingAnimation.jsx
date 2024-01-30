// Animation taken created by Aurer https://codepen.io/aurer/pen/ZEJxpO

export const LoadingAnimation = ({ theme }) => {
  let color;
  if (theme === 'light') {
    color = "#151375";
  } else if (theme === "dark") {
    color = "#dbdbdb";
  } else if (theme === "red") {
    color = "#a82b4b";
  } else {
    color = "#000000";
  }

  return (
    <div className="loader loader--style5" title="4">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="24px" height="30px" viewBox="0 0 24 30" style={{enableBackground: "new 0 0 50 50;"}} xmlSpace="preserve">
    <rect x="0" y="0" width="4" height="10" fill={color}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="10" y="0" width="4" height="10" fill={color}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="20" y="0" width="4" height="10" fill={color}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
</div>
  )
}